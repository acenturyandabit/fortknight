//bind inputs
document.querySelector('.gmode').addEventListener('input', (e) => {
    gameMode = e.target.value;
    renderHighscores();
    switch (e.target.value) {
        case 'classic':
            document.querySelectorAll('.rules').forEach(
                (i) =>
                (i.innerHTML = `
                    <p>+1 point for every turn on the field</p>
                    <p>+2 points for every king taken</p>
                    <p>+3 points for every knight, bishop, rook taken</p>
                    <p>+5 points for every queen taken</p>
                    `)
            );
            break;
        case 'strategist':
            document.querySelectorAll('.rules').forEach(
                (i) =>
                (i.innerHTML = `
                    <p><strong>Pieces will move in order rather than simultaneously.</strong></p>
                    <p>+1 point for every turn on the field</p>
                    <p>+2 points for every king taken</p>
                    <p>+3 points for every knight, bishop, rook taken</p>
                    <p>+5 points for every queen taken</p>
                    `)
            );
            break;
        case 'pacifist':
            document.querySelectorAll('.rules').forEach(
                (i) =>
                (i.innerHTML = `
                    <p>Only get points for staying alive</p>
                    <p>+0.5 points for every (big)king on the board</p>
                    <p>+0.7 points for every (big) knight, bishop, rook on the board</p>
                    <p>+1.25 points for every (big) queen on the board</p>
                    `)
            );
            break;
        case 'knightmare':
            document.querySelectorAll('.rules').forEach(
                (i) =>
                (i.innerHTML = `
                        <p>+1 point for every turn on the field</p>
                        <p>+3 points for every knight taken</p>
                        `)
            );
        case 'arcade':
            document.querySelectorAll('.rules').forEach(
                (i) =>
                (i.innerHTML = `
                    <p>+1 point for every 2.5 seconds on the field (the timer for the pieces moving)</p>
                    <p>+2 points for every king taken</p>
                    <p>+3 points for every knight, bishop, rook taken</p>
                    <p>+5 points for every queen taken</p>
                    `)
            );
            break;
    }
    checkMode();
});
document.querySelector('.sidebar').addEventListener('click', (e) => {
    let path = e.path || e.composedPath();
    for (let i of path) {
        if (i.matches && i.matches('.sidebar>div>p') && i.innerText != 'Forfeit') {
            document
                .querySelectorAll('.sidebar>div')
                .forEach((i) => i.classList.remove('selected'));
            i.parentElement.classList.add('selected');
        }
    }
});