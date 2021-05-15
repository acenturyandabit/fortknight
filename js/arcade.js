function startMoveTimer() {
    var timeLeft = 2.5;
    var moveTimer = setInterval(
        function() {
            if (timeLeft <= 0) {
                clearInterval(moveTimer);
                document.getElementById("timer-bar").value = 0;
                timeleft = 2.5;
            }
            document.getElementById("timer-bar").value = 2.5 - timeLeft;
            timeLeft -= .045;
        }, 45);
}
