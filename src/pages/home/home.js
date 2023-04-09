const themeButton = document.querySelector(".change-theme");

themeButton.addEventListener("click", (e) => {
	const body = document.querySelector("body");
	const currentTheme = body.getAttribute("data-theme");

	currentTheme == "dark"
		? body.setAttribute("data-theme", "light")
		: body.setAttribute("data-theme", "dark");
});
