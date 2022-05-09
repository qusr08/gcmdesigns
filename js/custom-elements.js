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
                <a href="about.html"><p>About</p></a>
                <div class="dropdown">
                    <a><p>Contact</p></a>
                    <div class="dropdown-list">
                        <a>Resume</a>
                        <a href="mailto:gcolonmelendez@vt.edu">Email</a>
                        <a href="https://www.instagram.com/gcmdesigns/">Instagram</a>
                        <a href="https://www.linkedin.com/in/gabrielacolonmelendez">LinkedIn</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a><p>Projects</p></a>
                    <div class="dropdown-list">
                        <a href="">Zona</a>
                        <a href="">Community Cycle</a>
                        <a href="">MelOrganic</a>
                        <a href="">CLC Luminary</a>
                        <a href="">Roanoke Follies</a>
                    </div>
                </div>
            </div>
        `;
    }
});

customElements.whenDefined('custom-header').then(() => {
    console.log('custom-header defined');
});