"use strict";

class Timer extends HTMLElement {
	#duration;
	#intervalID;

	constructor() {
		super();
		this.#duration = this.getAttribute("duration") ?? 5000;
	}

  start() {};

  stop() {};

  on() {};
}
