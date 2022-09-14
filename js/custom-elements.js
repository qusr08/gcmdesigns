window.customElements.define('custom-header', class extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <h1 class="header-title"><a href="index.html">gcmdesigns</a></h1>
            <div class="header-list">
                <div class="dropdown">
                    <a><p>About</p></a>
                    <div class="dropdown-list">
                        <a>Resume</a>
                        <a href="about.html">Bio</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a><p>Contact</p></a>
                    <div class="dropdown-list">
                        <a href="mailto:gcolonmelendez@vt.edu">Email</a>
                        <a href="https://www.instagram.com/gcmdesigns/">Instagram</a>
                        <a href="https://www.linkedin.com/in/gabrielacolonmelendez">LinkedIn</a>
                    </div>
                </div>
                <div class="dropdown">
                    <a><p>Projects</p></a>
                    <div class="dropdown-list">
                        <a href="miomedkit.html">MioMed Kit</a>
                        <a href="toble.html">Toble</a>
                        <a href="flatware.html">Flatware</a>
                        <a href="zona.html">Zona</a>
                        <a href="communitycycle.html">Community Cycle</a>
                        <!-- <a href="melorganic.html">MelOrganic</a> -->
                        <a href="luminary.html">CLC Luminary</a>
                        <a href="follies.html">Roanoke Follies</a>
                        <a href="kirigami.html">Kirigami</a>
                    </div>
                </div>
            </div>
        `;
    }
});

customElements.whenDefined('custom-header').then(() => {
    console.log('custom-header defined');
});