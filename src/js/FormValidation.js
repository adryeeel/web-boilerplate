"use strict";

export default class FormValidation {
	#message;
	#formElement;
	#reporterElements;

	constructor(formElement, reporterElements) {
		this.#formElement = formElement;
		this.#reporterElements = reporterElements;
	}

	get #inputs() {
		return document.querySelectorAll(`${this.#formElement.localName} input`);
	}

	#getInputConstraints(input) {
		const trueConstraints = [];

		for (const constraint in input.validity) {
			const constraintValue = input.validity[constraint];

			constraintValue ? trueConstraints.push(constraint) : 0;
		}

		return trueConstraints;
	}

	#getConstraintMessage(constraint) {
		const messages = {
			badInput: "Não foi possível interpretar o valor inserido.",
			valueMissing: "Por favor, preencha este campo.",
			tooShort: "Limite máximo de caracteres atingido.",
			tooLong: "Limite mínimo de caracteres não atingido.",
			rangeUnderflow: "Este valor é demasiado baixo.",
			rangeOverflow: "Este valor é demasiado alto.",
			typeMismatch: "O valor inserido não é o esperado para o tipo.",
			patternMismatch: "O valor inserido não satisfaz o padrão requerido.",
		};

		return messages[constraint];
	}

	#assignConstraintMessage(input, reporterElement) {
		const truthyConstraints = this.#getInputConstraints(input);
		this.#message = this.#getConstraintMessage(truthyConstraints[0]);

		reporterElement.textContent = this.#message;
	}

	#assignInputsEventListeners() {
		this.#inputs.forEach((input, index) => {
			const reporter = this.#reporterElements[index];

			input.addEventListener("input", () => {
				this.#assignConstraintMessage(input, reporter);
			});
		});
	}

	validate() {
		this.#assignInputsEventListeners();

		this.#formElement.addEventListener("submit", (eventHandler) => {

			for (let index = 0; index < this.#inputs.length; index++) {
				const input = this.#inputs[index];
				const reporter = this.#reporterElements[index];
				
				if (!input.checkValidity()) {
					this.#assignConstraintMessage(input, reporter);
					input.focus();
					eventHandler.preventDefault();

					break;
				}
			}
		});
	}
}
