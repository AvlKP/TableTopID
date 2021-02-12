class Filters extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.append(Filters.template.content.cloneNode(true));

		for (let option of this.shadowRoot.querySelectorAll("a")) {
			option.addEventListener("click", (e) => {
				e.stopPropagation;

				const expansion = e.target.nextElementSibling;

				e.target.classList.toggle("active");

				if (expansion.style.maxHeight) {
					expansion.style.maxHeight = null;
				} else {
					expansion.style.maxHeight = expansion.scrollHeight + "px";
				}
			});
		}

		this.shadowRoot
			.querySelector("#label>p")
			.addEventListener("click", () => {
				for (let input of this.shadowRoot.querySelectorAll(
					"input[type='radio']:checked"
				)) {
					input.checked = false;
				}

				for (let input of this.shadowRoot.querySelectorAll(
					"input[type='number']"
				)) {
					input.value = null;
				}
			});
	}
}

Filters.template = document.createElement("template");
Filters.template.innerHTML = `
<style>
	:host {
		width: 20%;
	}

	fieldset {
        border-radius: 4px;
	}

    h3, a {
        display: flex;
        position: relative;
        align-items: center;
    }
     
    #label {
        display: flex;
        flex-flow: row;
        justify-content: flex-end;
        align-items: center;
    }

    #label > p {
        cursor: pointer;
    }

    #label > h3 {
        flex: 1;
    }

    fieldset > div:not(#label) {
        margin: 20px 0;
    }

    a {
        cursor: pointer;
        margin: 0;
    }

	a::after {
        background-image: url("images/iconmonstr-plus-2.svg");
        background-size: 0.8em 0.8em;
        display: inline-flex;
        height: 0.8em;
        width: 0.8em;
		content: "";
		position: absolute;
        right: 0;
    }
    
    a.active::after {
        background-image: url("images/iconmonstr-minus-2.svg");
    }

    .expansion {
        max-height: 0;
        display: flex;
        overflow: hidden;
        transition: max-height 0.3s ease-out, display 0s;
    }

    .expansion > * {
        margin-top: 10px;
    }

    .expansion > p {
        margin-bottom: 0;
    }

    #publisher + .expansion, #type + .expansion {
        flex-flow: column;
    }

    #price + .expansion {
        justify-content: space-between;
    }

    #price + .expansion > input {
        width: 40%;
    }

    @media only screen and (max-width: 1200px) {
        :host {
            width: auto;
        }
    }
</style>

<form>
	<fieldset>
        <div id="label">
            <h3>Filters</h3>
            <p>Clear All</p>
        </div>
		<div>
			<a id="publisher">Publisher</a>
			<div class="expansion">
                <div>
                    <input
                        type="radio"
                        id="wotc"
                        name="publisher-input"
                        value="wotc"
                    /><label for="wotc">Wizards of the Coast</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="paizo"
                        name="publisher-input"
                        value="paizo"
                    /><label for="paizo">Paizo Inc.</label>
                </div>
            </div>
		</div>
		<div>
			<a id="type">Tipe</a>
			<div class="expansion">
				<div>
					<input
						type="radio"
						id="tabletop"
						name="type-input"
						value="tabletop"
					/><label for="tabletop">Tabletop RPG</label>
				</div>
				<div>
					<input
						type="radio"
						id="card"
						name="type-input"
						value="card"
					/><label for="card">Card Game</label>
				</div>
			</div>
		</div>
		<div>
			<a id="price">Harga</a>
			<div class="expansion">
                <input type="number" name="floor" id="floor" min="0" step="1000" /> 
                <p>-</p>
				<input type="number" name="roof" id="roof" min="0" step="1000" />
			</div>
		</div>
	</fieldset>
</form>
`;

customElements.define("filters-", Filters);
