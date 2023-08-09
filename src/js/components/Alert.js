"use strict";

import HTMLComponent from "../classes/HTMLComponent.js";

class AlertMessage extends HTMLComponent {
	#template = document.createElement("template");
	#shadowRoot = this.attachShadow({ mode: "closed" });

	constructor() {
		super();
	}

	connectedCallback() {
		this.validate();
		this.build();
		this.render();
		this.listen();
	}

	build() {
		this.#template.innerHTML = this.style + this.markup;
	}

	render() {
		this.classList.add("alert");
		this.#shadowRoot.append(this.#template.content.cloneNode(true));
	}

	listen() {
		// TODO: Animacao para fechar assim que o botao de fechar ]e clicacado. utilizar aria-hidden.
		// TODO: ADD FA scripts to project
		
		const closeButton = this.#shadowRoot.querySelector(".alert__close__button");

		closeButton.addEventListener("click", event => {
			console.log("close");
		});
	}

	validate() {
		const validTypes = ["success", "info", "error", "warning"];

		const alertType = this.getAttribute("type");

		if (!alertType || alertType === "" || !validTypes.includes(alertType)) {
			throw new Error(
				"Missing, empty or invalid 'type' attribute for 'alert-message' component.",
			);
		}

		return true;
	}

	get markup() {
		const titles = {
			info: "Info!",
			error: "Erro!",
			warning: "Aviso!",
			success: "Sucesso!",
		};

		const icons = {
			error: "fa-bomb",
			success: "fa-circle-check",
			info: "fa-circle-info",
			warning: "fa-circle-exclamation",
		}

		const alertType = this.getAttribute("type");

		return /* html */ `
			<div class="alert__icon">
				<i class="fa-solid ${icons[alertType]}"></i>
			</div>

			<div class="alert__message">
				<p class="alert__message__title">
					<slot name="title">${titles[alertType]}</slot>
				</p>
				<p class="alert__message__text">
					<slot name="message">Mensagem de ${titles[alertType].toLowerCase()}</slot>
				</p>
			</div>

			<div class="alert__close">
				<button class="alert__close__button">
					<i class="fa-solid fa-xmark alert__close__button__icon"></i>
				</button>
			</div>
		`;
	}

	get style() {
		const mainStylesheet = document.head
			.querySelector("link#main")
			.getAttribute("href");

		return /* html */ `
			<link rel="stylesheet" href="${mainStylesheet}" />
			<link 
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@latest/css/all.min.css"
			/>
		`;
	}
}

customElements.define("alert-message", AlertMessage);
