class Navbar extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.append(Navbar.template.content.cloneNode(true));

		const mediaQuery = window.matchMedia("(min-width: 992px)");

		let menu = this.shadowRoot.querySelector("#menu");
		let menuButton = this.shadowRoot.querySelector("#menu-icon");
		let navbar = this.shadowRoot.querySelector("#navbar");
		let searchBar = this.shadowRoot.querySelector(".search");
		let searchButton = this.shadowRoot.querySelector("#search-button");
		let title = this.shadowRoot.querySelector("#navbar>h5");

		function activateSearch() {
			searchBar.classList.add("active-search");
			menuButton.classList.add("active-search");
			title.classList.add("active-search");
		}

		function collapseSearch() {
			searchBar.classList.remove("active-search");
			menuButton.classList.remove("active-search");
			title.classList.remove("active-search");
		}

		if (mediaQuery.matches) {
			menu.classList.add("desktop-nav");
		} else {
			menu.classList.remove("desktop-nav");
			menu.classList.add("mobile-nav");
			menuButton.addEventListener("click", () => {
				navbar.classList.add("active");
			});
			searchButton.addEventListener("click", activateSearch);
		}

		let resizeTimer;
		window.addEventListener("resize", () => {
			navbar.classList.add("resize-animation-stopper");
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				navbar.classList.remove("resize-animation-stopper");
			}, 400);

			if (mediaQuery.matches) {
				menu.classList.remove("mobile-nav");
				menu.classList.add("desktop-nav");

				if (searchBar.classList.contains("active-search")) {
					collapseSearch();
					searchButton.removeEventListener("click", activateSearch);
				}
			} else {
				menu.classList.remove("desktop-nav");
				menu.classList.add("mobile-nav");
				menuButton.addEventListener("click", () => {
					navbar.classList.add("active");
				});
				searchButton.addEventListener("click", activateSearch);
			}
		});

		this.shadowRoot
			.querySelector(".search>svg")
			.addEventListener("click", collapseSearch);

		this.shadowRoot
			.querySelector("#background")
			.addEventListener("click", () => {
				navbar.classList.remove("active");
			});
	}
}
class Footer extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.append(Footer.template.content.cloneNode(true));
	}
}

Navbar.template = document.createElement("template");
Navbar.template.innerHTML = `
<style>
    svg {
        min-width: 24px;
    }

    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }

    a {
        color: black;
        position: relative;
    }

    a:link {
        text-decoration: none;
    }

    .desktop-nav a::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        width: 0;
        height: 2px;
        background-color: black;
        transition: all 0.3s ease;
    }
    
    .desktop-nav a:hover::after {
        width: 100%;
        left: 0;
    }

    nav {
        display: flex;
        height: 57px;
        align-content: center;
        border-bottom: 2px solid black;
    }

    nav>* {
        margin: 16px;
    }

    nav>h5 {
        flex: 1;
        font-size: 1.2rem;
    }

    nav>#background {
        margin: 0;
    }

    .desktop-nav {
        display: flex;
        flex-flow: row;
        flex: 1;
        align-items: center;
    }

    .desktop-nav>div + div {
        margin-left: 4vw;
    }

    .search, .account {
        display: none;
    }

    .search > svg {
        display: none;
    }

    .mobile-nav {
        margin: 0;
        display: flex;
        position: fixed;
        top: 0;
        height: 100vh;
        width: 75vw;
        flex-flow: column;
        background-color: white;
        z-index: 1;
        font-size: 3rem;
        left: -100vw;
        transition: left 0.4s ease-in;
    }
    
    .mobile-nav>* {
        padding: 10px;
        border-bottom: 3px solid black;
    }

    .active #menu {
        left: 0;
    }

    .active>#background {
        margin: 0;
        position: fixed;
        content: "";
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.7);
    }

    .search.active-search:not(.desktop-nav) {
        display: flex;
        margin: auto;
        flex: 1;
        align-items: center;
    }

    .search.active-search:not(.desktop-nav) > #search-box {
        flex: 1;
        box-sizing: border-box;
        height: 34px;
    }

    .search.active-search:not(.desktop-nav) > svg {
        display: inline-block;
        margin: 16px;
    }

    h5.active-search:not(.desktop-nav), #menu-icon.active-search:not(.desktop-nav) {
        display: none;
    }

    #search-box {
        margin-right: 0;
        border: 1px solid black;
        border-radius: 10px;
        padding: 4px 12px;
        width: 15vw;
        font-size: 18px;
    }

    .account>* + * {
        margin-left: 4px;
    }

    @media only screen and (min-width: 992px) {
        nav>h5 {
            flex: 0;
            margin-right: 4vw;
            font-size: 1.2em;
        }

        .account {
            display: flex;
        }

        #menu-icon {
            display: none;
        }

        .search {
            display: block;
            margin: auto;
        }
    } 

    @media only screen and (min-width: 1280px) {
        nav {
            padding: 0 10vw;
        }
    }
</style>

<nav id="navbar">
    <div id="background"></div>
    <div id="menu-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
        </svg>
    </div>
    <h5><a href="index.html">TableTopID</a></h5>
    <div id="menu">
        <div><a href="index.html">Beranda</a></div>
        <div><a href="catalogue.html">Katalog</a></div>
        <div><a href="contact.html">Kontak</a></div>
        <div><a href="about.html">Tentang</a></div>
    </div>
    <div class="search">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
        <input type="text" id="search-box">
    </div>
    <div id="search-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
                d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
        </svg>
    </div>
    <div class="account">
        <a href="#">Login</a><span>|</span><a href="#">Cart</a>
    </div>
</nav>
`;

customElements.define("nav-bar", Navbar);

Footer.template = document.createElement("template");
Footer.template.innerHTML = `
<style>
	.footer {
        display: flex;
        flex-flow: column;
		align-items: center;
		height: 137px;
		border-top: 2px solid black;
	}

	.media {
        width: 50vw;
        max-width: 265px;
		display: flex;
		flex-flow: row;
		flex: 1;
		align-items: center;
		justify-content: space-between;
	}

	.footer > h6 {
		margin-top: 0;
	}

	.footer > h6::before {
		content: "©";
		font-size: 1rem;
	}

	@media only screen and (min-width: 992px) {
		.media {
            min-width: 192px;
            max-width: 10vw;
		}
	}
</style>

<div class="footer">
    <div class="media">
        <div class="mediaIcon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
            </svg>
        </div>
        <div class="mediaIcon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path
                    d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"
                />
            </svg>
        </div>
        <div class="mediaIcon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
            </svg>
        </div>
    </div>
    <h6>Copyright 2021 TableTopID. All rights reserved.</h6>
</div>
`;

customElements.define("foot-er", Footer);
