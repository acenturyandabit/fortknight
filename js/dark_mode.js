

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

		if (playerIndex % 7 > 0 && Math.floor(playerIndex / 7) > 1) {
			drawToIndex(playerMovementProjection1, playerIndex - 15);
			playerMovementProjection1.style.opacity = '60';
		}
		if (playerIndex % 7 < 6 && Math.floor(playerIndex / 7) > 1) {
			drawToIndex(playerMovementProjection2, playerIndex - 13);
			playerMovementProjection2.style.opacity = '60';
		}
		if (playerIndex % 7 > 1 && Math.floor(playerIndex / 7) > 0) {
			drawToIndex(playerMovementProjection3, playerIndex - 9);
			playerMovementProjection3.style.opacity = '60';
		}
		if (playerIndex % 7 < 5 && Math.floor(playerIndex / 7) > 0)
		{
			drawToIndex(playerMovementProjection4, playerIndex - 5);
			playerMovementProjection4.style.opacity = '60';
		}
		if (playerIndex % 7 > 1 && Math.floor(playerIndex / 7) < 6) {
			drawToIndex(playerMovementProjection5, playerIndex + 5);
			playerMovementProjection5.style.opacity = '60';
		}
		if (playerIndex % 7 < 5 && Math.floor(playerIndex / 7) < 6) {
			drawToIndex(playerMovementProjection6, playerIndex + 9);
			playerMovementProjection6.style.opacity = '60';
		}
		if (playerIndex % 7 > 0 && Math.floor(playerIndex / 7) < 5) {
			drawToIndex(playerMovementProjection7, playerIndex + 13);
			playerMovementProjection7.style.opacity = '60';
		}
		if (playerIndex % 7 < 6 && Math.floor(playerIndex / 7) < 5) {
			drawToIndex(playerMovementProjection8, playerIndex + 15);
			playerMovementProjection8.style.opacity = '60';
		}

		playerMovementProjection1.style.zIndex = '0';
		playerMovementProjection2.style.zIndex = '0';
		playerMovementProjection3.style.zIndex = '0';
		playerMovementProjection4.style.zIndex = '0';
		playerMovementProjection5.style.zIndex = '0';
		playerMovementProjection6.style.zIndex = '0';
		playerMovementProjection7.style.zIndex = '0';
		playerMovementProjection8.style.zIndex = '0';
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

		playerMovementProjection1.style.zIndex = '-2';
		playerMovementProjection2.style.zIndex = '-2';
		playerMovementProjection3.style.zIndex = '-2';
		playerMovementProjection4.style.zIndex = '-2';
		playerMovementProjection5.style.zIndex = '-2';
		playerMovementProjection6.style.zIndex = '-2';
		playerMovementProjection7.style.zIndex = '-2';
		playerMovementProjection8.style.zIndex = '-2';
	}
}
