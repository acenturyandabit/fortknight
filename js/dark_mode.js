function switchDarkMode() {
	darkMode = document.querySelector('.dark-mode-switch input').checked;
	if (darkMode) {
		document.body.classList.add("dark");
	} else {
		document.body.classList.remove("dark");
	}
}


let OnOff = 0;	//this variable will decide whether the ProjectionMovement switch is ON or OFF
/*if OnOff variable is an even number it means the switch is on the OFF, else it means its on the ON
* if OnOff is odd number it will make the ProjectMovement variable TRUE and this will let the game
* project the knight's possible movements */
function projectMovement() {
	OnOff++;

	if (OnOff % 2 == 1)
	{
		ProjectMovement = true;
		drawPlayerPossibleMoves();
	}
	else
	{
		ProjectMovement = false;
		playerMovementProjection1.style.opacity = '0';
		playerMovementProjection2.style.opacity = '0';
		playerMovementProjection3.style.opacity = '0';
		playerMovementProjection4.style.opacity = '0';
		playerMovementProjection5.style.opacity = '0';
		playerMovementProjection6.style.opacity = '0';
		playerMovementProjection7.style.opacity = '0';
		playerMovementProjection8.style.opacity = '0';
	}
}
