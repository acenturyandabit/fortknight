function startMoveTimer() {    
    let timeLeft = 2.5;
    const moveTimer = setInterval(
        function() {
            if (timeLeft <= 0) {                
                return clearInterval(moveTimer); 
            }
            document.getElementById("timer-bar").value = 2.5 - timeLeft;
            timeLeft -= .045;
        }, 45);
}
