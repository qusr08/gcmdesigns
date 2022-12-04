window.customElements.define('gcm-project', class extends HTMLElement {
    constructor() {
        super();

        this.gridRowHeight = 0;
    }

    connectedCallback() {
        let content = this.trimAllElements(this.getAttribute('content').split(','));

        // Content Language Docs

        // elementType:gridColumn: ...
        //      elementType > How the element is processed and added to the HTML
        //      gridColumn > The number of columns the element should span (1, 2)

        // image: ... :backgroundImage
        //      backgroundImage > The path of the background image

        // text: ... :backgroundColor:justifyContent:alignItems:text1:style1:text2:style2: ...
        //      backgroundColor > The background color of the text
        //      justifyContent > The vertical alignment of the text items
        //      alignItems > The horizontal alignment of the text items
        //      textN > The text to be displayed
        //      styleN > The style of the text before it (h1, h2, h3, h4, h5, h6, p)

        // Loop through all the content and add it to the inner HTML
        for (let i = 0; i < content.length; i++) {
            let element = this.trimAllElements(content[i].split(':'));

            // Make sure the element has parameters
            if (element.length <= 2) {
                console.log(`Element ${element[0]} with no parameters!`);
                continue;
            }

            // Calculate the grid height over time
            this.gridRowHeight += parseFloat(element[1]) / 2;

            // Remove the base parameters and get only the type specific parameters
            let type = element.slice(2);

            switch (element[0]) {
                case 'image':
                    let image = document.createElement('span');
                    image.style.gridColumn = `span ${element[1]}`;
                    image.style.backgroundImage = `url('${type[0]}')`;
                    this.appendChild(image);

                    break;

                case 'text':
                    let div = document.createElement('div');
                    div.style.gridColumn = `span ${element[1]}`;
                    div.style.backgroundColor = type[0];
                    div.style.justifyContent = type[1];
                    div.style.alignItems = type[2];

                    for (let j = 3; j < type.length; j += 2) {
                        let text = document.createElement(type[j + 1]);
                        text.innerHTML += type[j];

                        // If the text style is set to h3, add a text accent
                        if (type[j + 1] == 'h3') {
                            text.innerHTML += `<span class="text-accent top left" style="border-color: white;"></span>`;
                        }

                        div.appendChild(text);
                    }

                    this.appendChild(div);

                    break;

                default:
                    console.log(`Unknown element type '${element[0]}'.`);

                    break;
            }
        }

        this.updateGridRowHeight();
    }

    static get observedAttributes() {
        return ['class'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'class':
                this.updateGridRowHeight();
                break;
        }
    }

    updateGridRowHeight() {
        if (this.classList.contains('view')) {
            this.style.gridTemplateRows = `repeat(${this.gridRowHeight}, 85vh)`;
        } else {
            this.style.gridTemplateRows = `repeat(${this.gridRowHeight}, calc(100vh - var(--header-h)))`;
        }
    }

    trimAllElements(array) {
        for (let i = 0; i < array.length; i++) {
            array[i] = array[i].trim();
        }

        return array;
    }
});