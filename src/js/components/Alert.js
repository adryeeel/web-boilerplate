class Alert extends HTMLElement {
  #shadowRoot = this.attachShadow({ mode: "closed" });

	constructor() {
		super();
	}
}
