//bind inputs
document.querySelector('.gmode').addEventListener('input', (e) => {
    gameMode = e.target.value;
    renderHighscores();
    switch (e.target.value) {
        case 'classic':
            document.querySelectorAll('.rules').forEach(
                (i) =>
                (i.innerHTML = `
                    <p><innerText style = "color: #8CA1C5">+1 point for every turn on the field</p>
                    <p><innerText style = "color: #467AD5">+1 point for every pawn taken</p>
                    <p><innerText style = "color: #0C46A9">+2 points for every king taken</p>
                    <p><innerText style = "color: #CF469F">+3 points for every knight, bishop, rook taken</p>
                    <p><innerText style = "color: #30DE0D">+5 points for every queen taken</p>
                    `)
            );
            break;
        case 'strategist':
            document.querySelectorAll('.rules').forEach(
                (i) =>
                (i.innerHTML = `
                    <p><strong><innerText font size = "5" style = "color: red">Pieces will move in order rather than simultaneously.</strong></p>
                    <p><innerText style = "color: #8CA1C5">+1 point for every turn on the field</p>
                    <p><innerText style = "color: #467AD5">+1 point for every pawn taken</p>
                    <p><innerText style = "color: #0C46A9">+2 points for every king taken</p>
                    <p><innerText style = "color: #CF469F">+3 points for every knight, bishop, rook taken</p>
                    <p><innerText style = "color: #30DE0D">+5 points for every queen taken</p>
                    `)
            );
            break;
        case 'pacifist':
            document.querySelectorAll('.rules').forEach(
                (i) =>
                (i.innerHTML = `
                    <p><strong><innerText  style = "color: red">Only get points for staying alive</strong></p>
                    <p><innerText style = "color: #467AD5">+0.25 points for every (big) pawn on the board</p>
                    <p><innerText style = "color: #0C46A9">+0.5 points for every (big) king on the board</p>
                    <p><innerText style = "color: #CF469F">+0.7 points for every (big) knight, bishop, rook on the board</p>
                    <p><innerText style = "color: #30DE0D">+1.25 points for every (big) queen on the board</p>
                    `)
            );
            break;
        case 'knightmare':
            document.querySelectorAll('.rules').forEach(
                (i) =>
                (i.innerHTML = `
                        <p><innerText style = "color: #467AD5">+1 point for every turn on the field</p>
                        <p><innerText style = "color: #EC7063">+3 points for every knight taken</p>
                        `)
            );
            break;
        case 'arcade':
            document.querySelectorAll('.rules').forEach(
                (i) =>
                (i.innerHTML = `
                    <p><innerText style = "color: #EC7063">+1 point for every 2.5 seconds on the field (the timer for the pieces moving)</p>
                    <p><innerText style = "color: #467AD5">+1 point for every pawn taken</p>
                    <p><innerText style = "color: ##0C46A9">+2 points for every king taken</p>
                    <p><innerText style = "color: #CF469F">+3 points for every knight, bishop, rook taken</p>
                    <p><innerText style = "color: #30DE0D">+5 points for every queen taken</p>
                    `)
            );
            break;
        case 'drunk':
            document.querySelectorAll('.rules').forEach(
                (i) =>
                (i.innerHTML = `
                    <p><innerText style = "color: #8CA1C5">+1 point for every turn on the field</p>
                    <p><innerText style = "color: #467AD5">+1 point for every pawn taken</p>
                    <p><innerText style = "color: #0C46A9">+2 points for every king taken</p>
                    <p><innerText style = "color: #CF469F">+3 points for every knight, bishop, rook taken</p>
                    <p><innerText style = "color: #30DE0D">+5 points for every queen taken</p>
                    `)
            );
            break;
        case 'loop':
                document.querySelectorAll('.rules').forEach(
                    (i) =>
                    (i.innerHTML = `
                        <p><innerText style = "color: #8CA1C5">+1 point for every turn on the field</p>
                        <p><innerText style = "color: #467AD5">+1 point for every pawn taken</p>
                        <p><innerText style = "color: #0C46A9">+2 points for every king taken</p>
                        <p><innerText style = "color: #CF469F">+3 points for every knight, bishop, rook taken</p>
                        <p><innerText style = "color: #30DE0D">+5 points for every queen taken</p>
                        `)
                );
                break;
    }
});
document.querySelector('.sidebar').addEventListener('click', (e) => {
    let path = e.composedPath();
    for (let i of path) {
        if (i.matches && i.matches('.sidebar > div > p') && i.innerText !== 'Forfeit') {
            // Remove 'selected' class from all tabs
            document.querySelectorAll('.sidebar > div').forEach((tab) => tab.classList.remove('selected'));
            
            // Add 'selected' class to the clicked tab
            i.parentElement.classList.add('selected');

            // Toggle visibility of associated content
            // const targetId = 'tab-content' // Converts "High Scores" to "high-scores"
            // const content = document.getElementById(targetId);

            // if (content) {
            //     content.style.visibility = (content.style.visibility === 'hidden' || !content.style.visibility) 
            //         ? 'visible' 
            //         : 'hidden';
            //     console.log(`${targetId} visibility: ${content.style.visibility}`);
            // }
        }
    }
});

