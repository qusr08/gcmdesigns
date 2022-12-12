window.customElements.define('gcm-project', class extends HTMLElement {
    constructor() {
        super();

        // this.gridRowHeight = 0;
    }

    connectedCallback() {
        let content = this.trimAllElements(this.getAttribute('content').split('|'));

        // Content Language Docs

        // elementType*gridColumn* ...
        //      elementType > How the element is processed and added to the HTML
        //      gridColumn > The number of columns the element should span (1, 2)

        // image* ... *backgroundImage*caption
        //      backgroundImage > The path of the background image
        //      caption > The caption for the image

        // text* ... *backgroundColor*justifyContent*alignItems*text1*style1*text2*style2* ...
        //      backgroundColor > The background color of the text
        //      justifyContent > The vertical alignment of the text items
        //      alignItems > The horizontal alignment of the text items
        //      textN > The text to be displayed
        //      styleN > The style of the text before it (h1, h2, h3, h4, h5, h6, p)

        // embed* ... *file*fileType
        //      file > The file to embed
        //      fileType > The type of file to embed

        // iframe* ... *link
        //      link > The link to the video

        // Loop through all the content and add it to the inner HTML
        for (let i = 0; i < content.length; i++) {
            let element = this.trimAllElements(content[i].split('*'));

            // Make sure the element has parameters
            if (element.length <= 2) {
                console.log(`Element ${element[0]} with no parameters!`);
                continue;
            }

            // Calculate the grid height over time
            // this.gridRowHeight += parseFloat(element[1]) / 2;

            // Remove the base parameters and get only the type specific parameters
            let elementParameters = element.slice(2);

            switch (element[0]) {
                case 'image':
                    let image = document.createElement('span');
                    image.style.gridColumn = `span ${element[1]}`;
                    image.style.backgroundImage = `url('${elementParameters[0]}')`;
                    this.appendChild(image);

                    if (elementParameters.length > 1) {
                        let caption = document.createElement('p');
                        caption.innerHTML = elementParameters[1];
                        caption.classList.add("caption");
                        image.appendChild(caption);
                    }

                    break;

                case 'text':
                    let div = document.createElement('div');
                    div.style.gridColumn = `span ${element[1]}`;
                    div.style.backgroundColor = elementParameters[0];
                    div.style.justifyContent = elementParameters[1];
                    div.style.alignItems = elementParameters[2];

                    for (let j = 3; j < elementParameters.length; j += 2) {
                        let text = document.createElement(elementParameters[j + 1]);
                        text.innerHTML += elementParameters[j];

                        // If the text style is set to h2, add a text accent
                        if (elementParameters[j + 1] == 'h2') {
                            text.innerHTML += `<span class="text-accent top left" style="border-color: black;  border-top-width: 10px; border-left-width: 10px;"></span>`;
                            text.innerHTML += `<span class="text-accent bottom right" style="border-color: black; border-right-width: 10px; border-bottom-width: 10px;"></span>`;
                            text.style.fontSize = '4em';
                        }

                        // If the text style is set to h3, add a text accent
                        if (elementParameters[j + 1] == 'h3') {
                            text.innerHTML += `<span class="text-accent top left" style="border-color: black;"></span>`;
                        }

                        div.appendChild(text);
                    }

                    this.appendChild(div);

                    break;

                case 'embed':
                    let embed = document.createElement('embed');
                    embed.style.gridColumn = `span ${element[1]}`;
                    embed.src = elementParameters[0];
                    embed.type = elementParameters[1];
                    this.appendChild(embed);

                    break;

                case 'iframe':
                    let iframe = document.createElement('iframe');
                    iframe.style.gridColumn = `span ${element[1]}`;
                    iframe.src = elementParameters[0];
                    iframe.allowFullscreen = true;
                    this.appendChild(iframe);

                    break;

                default:
                    console.log(`Unknown element type '${element[0]}'.`);

                    break;
            }
        }

        // this.updateGridRowHeight();
    }

    // static get observedAttributes() {
    //     return ['class'];
    // }

    // attributeChangedCallback(name, oldValue, newValue) {
    //     switch (name) {
    //         case 'class':
    //             this.updateGridRowHeight();
    //             break;
    //     }
    // }

    // updateGridRowHeight() {
    //     if (this.classList.contains('view')) {
    //         this.style.gridTemplateRows = `repeat(${Math.ceil(this.gridRowHeight)}, 85vh)`;
    //     } else {
    //         this.style.gridTemplateRows = `repeat(${Math.ceil(this.gridRowHeight)}, calc(100vh - var(--header-h)))`;
    //     }
    // }

    trimAllElements(array) {
        for (let i = 0; i < array.length; i++) {
            array[i] = array[i].trim();
        }

        return array;
    }
});

window.customElements.define('gcm-logo', class extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <img id="logo" onclick="window.open('index.html', '_self');" src="logos/gcm-logo.png">
        `;
    }
});