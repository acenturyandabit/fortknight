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
                    <p><innerText style = "color: #467AD5">+2 points for every king taken</p>
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
                    <p><innerText  style = "color: #8CA1C5">+1 point for every turn on the field</p>
                    <p><innerText style = "color: #467AD5">+2 points for every king taken</p>
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
                    <p><innerText style = "color: #467AD5">+0.5 points for every (big)king on the board</p>
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
                    <p><innerText style = "color: #467AD5">+2 points for every king taken</p>
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
                    <p><innerText style = "color: #467AD5">+2 points for every king taken</p>
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
                        <p><innerText style = "color: #467AD5">+2 points for every king taken</p>
                        <p><innerText style = "color: #CF469F">+3 points for every knight, bishop, rook taken</p>
                        <p><innerText style = "color: #30DE0D">+5 points for every queen taken</p>
                        `)
                );
                document.querySelectorAll('.ex_instr').forEach(
                    (i) =>
                    (i.innerHTML = `
                       <br>
                       <div class="tornado_instr" >------------------------<< Pieces on the edge rotate By 90 degrees Anti-Clockwise every move >>------------------------</div>
                        `));
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

