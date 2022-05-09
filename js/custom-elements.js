window.customElements.define('custom-header', class extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <h1 class="header-title">
                <a href="index.html">gcmdesigns</a>
            </h1>
            <div class="header-list">
                <a href="about.html">
                    <p>About</p>
                </a>
                <a href="">
                    <p>Contact</p>
                </a>
                <a href="">
                    <p>Projects</p>
                </a>
            </div>
        `;
    }
});

customElements.whenDefined('custom-header').then(() => {
    console.log('custom-header defined');
});