class Navbar extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.append(Navbar.template.content.cloneNode(true));

		const mediaQuery = window.matchMedia("(min-width: 992px)");

		let menu = this.shadowRoot.querySelector("#menu");
		let navbar = this.shadowRoot.querySelector("#navbar");

		if (mediaQuery.matches) {
			menu.classList.add("desktop-nav");
		} else {
			menu.classList.remove("desktop-nav");
			menu.classList.add("mobile-nav");
			this.shadowRoot
				.querySelector("#menu-icon")
				.addEventListener("click", () => {
					navbar.classList.add("active");
				});
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
			} else {
				menu.classList.remove("desktop-nav");
				menu.classList.add("mobile-nav");
				this.shadowRoot
					.querySelector("#menu-icon")
					.addEventListener("click", () => {
						navbar.classList.add("active");
					});
			}
		});

		this.shadowRoot
			.querySelector("#background")
			.addEventListener("click", () => {
				navbar.classList.remove("active");
			});
	}
}

Navbar.template = document.createElement("template");
Navbar.template.innerHTML = `
<style>
    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }

    a {
        color: black;
    }

    a:link {
        text-decoration: none;
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

    .account>* + * {
        margin-left: 4px;
    }

    @media only screen and (min-width: 992px) {
        nav>h5 {
            flex: 0;
            margin-right: 4vw;
            font-size: 1.2em;
        }

        #menu-icon {
            display: none;
        }

        .search {
            display: block;
            margin: auto;
        }

        #search-box {
            margin-right: 0;
            border: 1px solid black;
            border-radius: 10px;
            padding: 4px 12px;
            width: 15vw;
            font-size: 18px;
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
    <h5>TableTopID</h5>
    <div id="menu">
        <div><a href="index.html">Beranda</a></div>
        <div><a href="#"></a>Katalog</div>
        <div><a href="#"></a>Kontak</div>
        <div><a href="#"></a>Tentang</div>
    </div>
    <div class="search">
        <input type="text" id="search-box"></div>
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
