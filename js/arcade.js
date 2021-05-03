//state 1 for start state 0 for stop
function startArcadeMoveTimerBox() {
    var timeleft = 2.5;
    var downloadTimer = setInterval(
        function() {
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
                document.getElementById("progressBar").value = 0;
                timeleft = 2.5;
            }
            document.getElementById("progressBar").value = 2.5 - timeleft;
            timeleft -= .045;
        }, 45);
}