function switchDarkMode() {
	darkMode = document.querySelector('.dark-mode-switch input').checked;
	if (darkMode) {
		document.body.classList.add("dark");
	} else {
		document.body.classList.remove("dark");
	}
}


function projectMovement() {
	!PH.getStatus() ? PH.enable() : PH.disable();
}
