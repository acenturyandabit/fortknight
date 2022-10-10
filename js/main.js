let gameMode = 'classic';
let isForfeited = false;
let didGameStart = false;







let style = document.createElement('style');
document.body.appendChild(style);
let board = document.querySelector('.board');
for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
        style.innerHTML += `.board>div:nth-child(${i + j * 7 + 1}){
                background:${i % 2 ^ j % 2 ? 'white' : 'black'};
                color:${i % 2 ^ j % 2 ? 'black' : 'white'};
            }
            .board>div:nth-child(${i + j * 7 + 1})>*{
                background: ${i % 2 ^ j % 2 ? 'black' : 'white'};
            }
            `;
        let d = document.createElement('div');
        d.style.gridArea = `${i + 1}/${j + 1}/${i + 2}/${j + 2}`;
        board.insertBefore(d, board.children[j + i * 7]);
    }
}
let playerScore = 0;
let playerIndex = 24;
let playerImage = document.querySelector('#wknight').cloneNode();
playerImage.style.position = 'absolute';
playerImage.style.transform = 'translate(-50%,-50%)';

function drawToIndex(node, index) {
    document.querySelector('.board').appendChild(node);
    let shade = document.querySelector(`.board>:nth-child(${index + 1})`);
    shadeRect = shade.getClientRects()[0];
    boardRect = document.querySelector('.board').getClientRects()[0];
    node.style.left = shadeRect.x - boardRect.x + shadeRect.width / 2;
    node.style.top = shadeRect.y - boardRect.y + shadeRect.height / 2;
}

function drawPlayer() {
    document.querySelector('#score').innerText = playerScore;
    drawToIndex(playerImage, playerIndex);
}
let targetDiffScore = 3;

let gameIsPlayed = false;

function resetGame() {
    //Start the game
    //this will enable keyboard movements only when game starts
    Array.from(document.querySelectorAll(`.board>div`)).forEach(
        (i) => (i.style.background = ''));
    didGameStart = true;
    // reset forfeit status for arcade time to run
    isForfeited = false;
    //spawn the knight
    playerIndex = 24;
    playerScore = 0;
    pieces.forEach((i) => {
        i.cleanup();
        i.icon.remove();
    });
    pieces = [];
    targetDiffScore = 3;
    document.querySelector('.boardModal').style.display = 'none';
    drawPlayer();
    document.querySelector('.gmode').disabled = true;
    gameIsPlayed = true;
    document.querySelector('#gmode-help').classList = '';
    if (gameMode == 'arcade') {
        document.getElementById("timer-box").style.display = 'block';
        arcadeModeExec();
    } else {
        //clear the Timer if present from arcade mode
        document.getElementById("timer-box").style.display = 'none';
    }
    clearAchievementProgressAfterReset();
}

function forfeitGame() {
    if (gameIsPlayed) {
        //reset the didGameStart
        didGameStart = false;
        isForfeited = true;
        document.querySelector('.boardModal').style.display = 'grid';
        document.querySelector('.loss_modal').style.display = 'block';
        document.querySelector('.loss_modal span').innerText =
            playerScore + ' You have forfeited the game!';
        //updateHighscores(playerScore, gameMode);
        document.querySelector('.gmode').disabled = false;
        gameIsPlayed = false;

    }
}

function getPlayerNextMoves(playerIndex1) {
    let playerNextMoves = protopieces['knight'].generateMoves(playerIndex1);
    return playerNextMoves;
}

function isSquareSafe(move, allPieces) {
    for (p of allPieces) {
        if (p.canHitSquare(move)) {
            return false;
        }
    }
    return true;
}
//a testing function for isSquareSafe
function checkNextMoveSafety(allPieces, playerIndex2) {
    moves = getPlayerNextMoves(playerIndex2);
    //Add the move that the player might stay in current place
    moves.push(playerIndex2);
    let safety = true;
    for (move of moves) {
        safety = safety & isSquareSafe(move, allPieces);
    }
    return safety;
}

let occupiedSquares = [];

let pieces = [];
let wasTouch = false;
document.querySelector('.board').addEventListener('touchstart', (e) => {
    wasTouch = true;
});
document.querySelector('.board').addEventListener('mousemove', (e) => {
    if (wasTouch) {
        wasTouch = false;
        return;
    }
    Array.from(document.querySelectorAll(`.board>div`)).forEach(
        (i) => (i.style.background !='blue' ? i.style.background = '': i.style.background = 'blue')
    );
    let path = e.path || e.composedPath();
    if (path[0].matches('.board>div>img')) {
        let thePiece;
        for (let i of pieces) {
            if (i.icon == path[1]) {
                thePiece = i;
                break;
            }
        }
        let possibleMoves = protopieces[thePiece.type].generateMoves(
            thePiece.index
        );
        possibleMoves = possibleMoves.filter((i) => !isOccupied(i));
        for (let i of possibleMoves) {
            document.querySelector(
                `.board>div:nth-child(${i + 1})`
            ).style.background = 'lightblue';
        }
    }
});
let nope = {}; // intervals for red squares
document.querySelector('.board').addEventListener('click', (e) => {
    let squareIndex;
    let path = e.path || e.composedPath();

    //console.log(path);

    if (path[0].matches('.board')) return;
    for (let p of path) {
        //console.log(p);

        if (p.matches('.board>img')) {
            if (p == playerImage) squareIndex = playerIndex;
            break;
        }
        if (p.matches('.board>div')) {
            squareIndex = Array.from(
                document.querySelector('.board').children
            ).indexOf(p);
            if (squareIndex > 48) {
                for (let i of pieces) {
                    if (i.icon == p) {
                        squareIndex = i.index;
                        break;
                    }
                }
            }
            if (squareIndex == 49) return;
            break;
        }
    }

    //Check if the squareIndex is a valid move relative to the playerIndex
    if (
        squareIndex == playerIndex ||
        (squareIndex - playerIndex == -15 &&
            playerIndex % 7 > 0 &&
            Math.floor(playerIndex / 7) > 1) ||
        (squareIndex - playerIndex == -13 &&
            playerIndex % 7 < 6 &&
            Math.floor(playerIndex / 7) > 1) ||
        (squareIndex - playerIndex == -9 &&
            playerIndex % 7 > 1 &&
            Math.floor(playerIndex / 7) > 0) ||
        (squareIndex - playerIndex == -5 &&
            playerIndex % 7 < 5 &&
            Math.floor(playerIndex / 7) > 0) ||
        (squareIndex - playerIndex == 5 &&
            playerIndex % 7 > 1 &&
            Math.floor(playerIndex / 7) < 6) ||
        (squareIndex - playerIndex == 9 &&
            playerIndex % 7 < 5 &&
            Math.floor(playerIndex / 7) < 6) ||
        (squareIndex - playerIndex == 13 &&
            playerIndex % 7 > 0 &&
            Math.floor(playerIndex / 7) < 5) ||
        (squareIndex - playerIndex == 15 &&
            playerIndex % 7 < 6 &&
            Math.floor(playerIndex / 7) < 5)
    ) {
        //its a valid move, execute it

        let killed = false;
        playerIndex = squareIndex;
        //move pieces
        if (gameMode != 'arcade') {
            pieces.map((p) => p.cleanup());
        }
        occupiedSquares = []; // reset so that pieces can take you if you take pieces
        pieces = pieces.filter((p) => {
            let ok = p.checkAlive();
            if (!ok) {
                totalKills++;
                killed = true;
                if (gameMode != 'pacifist') playerScore += protopieces[p.type].value;
                p.icon.remove();
            }
            return ok;
        });

        if (gameMode != 'arcade') {
            pieces.map((p) => p.move());
        }

        let playerIsDead = pieces.reduce(
            (d, pp) => d || (pp.index == playerIndex && !pp.deploymentCounter),
            false
        );
        if (playerIsDead) {
            //reset the didGameStart
            didGameStart = false;
            pieces.map((p) => p.draw());
            //i deduct a kill when i get killed myself to not have both loss and achievements pop
            if (killed) totalKills--;
            document.querySelector('#score').innerText = playerScore;
            document.querySelector('.gmode').disabled = false;
            document.querySelector('.loss_modal').style.display = 'block';
            document.querySelector('.loss_modal span').innerText = playerScore;
            updateHighscores(playerScore, gameMode);
            playerImage.remove();
            document.querySelector('.boardModal').style.display = 'grid';
            gameIsPlayed = false;
            document.querySelector('#gmode-help').classList = 'hidden';
            playerIndex = -1;
            return;
            // show the button
        }
        playerTotalSteps += 3;
        occupiedSquares = [];
        pieces.map((p) => p.checkAlive()); // repopulate occupied squares so we dont spawn on occupied squares
        //add extra pieces
        let diffScore = pieces.reduce((p, i) => p + protopieces[i.type].value, 0);
        if (diffScore < targetDiffScore) {
            let spawnArr = [];
            for (let i of protoArr) {
                for (let j = 0; j < i[1].spawnTries; j++) {
                    spawnArr.push(i[0]);
                }
            }
            if (gameMode != 'arcade') {
                let randomPiece = spawnArr[Math.floor(Math.random() * spawnArr.length)];
                if (gameMode == 'knightmare') randomPiece = 'knight';
                let allowSpawnLocations = [];
                for (let i = 0; i < 49; i++)
                    if (!isOccupied(i)) allowSpawnLocations.push(i);
                if (allowSpawnLocations.length) {
                    let randomPosition =
                        allowSpawnLocations[
                            Math.floor(Math.random() * allowSpawnLocations.length)
                        ];
                    pieces.push(new Piece(randomPiece, randomPosition));
                }
            }
        }
        occupiedSquares = [];
        pieces.map((p) => p.checkAlive()); // repopulate occupied squares
        if (gameMode == 'strategist') {
            pieces.filter((i) => i.deploymentCounter > 0).map((p) => p.draw());
            pieces
                .filter((i) => i.deploymentCounter == 0)
                .map((p, i) => setTimeout(p.draw, (200 / pieces.length) * i));
        } else {
            pieces.map((p) => p.draw());
        }

        if (gameMode == 'pacifist')
            playerScore +=
            pieces.reduce(
                (p, i) => (p + !i.deploymentCounter ? protopieces[i.type].value : 0),
                0
            ) / 4;
        targetDiffScore += gameMode == 'knightmare' ? 1 : 0.5;
        playerScore++;
        checkAchievements();
        drawPlayer();
    } else {
        if (gameIsPlayed) {
            //flash the attempted square
            let element = document.querySelector(
                `.board>div:nth-child(${squareIndex + 1})`
            );
            element.style.background = 'red';
            if (nope[squareIndex]) clearTimeout(nope[squareIndex]);
            nope[squareIndex] = setTimeout(() => {
                element.style.background = '';
            }, 1000);
        }
    }
});
/*using only keydown means if you hold down an option
you will keep moving in that direction as long as you can*/
if(gameMode!="loop"){
document.addEventListener('keydown', e => {
  let destIndex;
  // Check is the begin button was pressed
  // If game did not start do nothing
  if(!didGameStart) return;
  const key = e.key;
  if(key == "q" || key == "Q"){
    //Q pressed, move 2 left and 1 up
    destIndex = playerIndex - 9;
  }else if(key == "w" || key == "W"){
    //W pressed, move 1 left and 2 up
    destIndex = playerIndex - 15;
  }else if(key == "e" || key == "E"){
    //E pressed, move 1 right and 2 up
    destIndex = playerIndex - 13;
  }else if(key == "r" || key == "R"){
    //R pressed, move 2 right and 1 up
    destIndex = playerIndex - 5;
  }else if(key == "a" || key == "A"){
    //A pressed, move 2 left and 1 down
    destIndex = playerIndex + 5;
  }else if(key == "s" || key == "S"){
    //S pressed, move 1 left and 2 down
    destIndex = playerIndex + 13;
  }else if(key == "d" || key == "D"){
    //D pressed, move 1 right and 2 down
    destIndex = playerIndex + 15;
  }else if(key == "f" || key == "F"){
    //F pressed, move 2 right and 1 down
    destIndex = playerIndex + 9;
  }

  /*destIndex now holds the destination index
    check if destination will be a square on the board and gaem is not over
    playerIndex == -1 signifies end of game*/
  if(destIndex >= 0 && destIndex <= 48 && playerIndex != -1){
    let board = document.querySelector('.board').children;
    //we go to the equivalent square and simulate a click which triggers same event as a mouse click
    board[destIndex].click();
  }
});
}

function arcadeModeExec() {

    //figure out which square we're on
    let killed = false;
    //move pieces
    pieces.map((p) => p.cleanup());

    occupiedSquares = []; // reset so that pieces can take you if you take pieces
    pieces = pieces.filter((p) => {
        let ok = p.checkAlive();
        if (!ok) {
            totalKills++;
            killed = true;
            if (gameMode != 'pacifist') playerScore += protopieces[p.type].value;
            p.icon.remove();
        }
        return ok;
    });
    pieces.map((p) => p.move());
    // repopulate occupied squares so we dont spawn on occupied squares
    //add extra pieces
    let playerIsDead = pieces.reduce(
        (d, pp) => d || (pp.index == playerIndex && !pp.deploymentCounter),
        false
    );
    if (playerIsDead) {
        pieces.map((p) => p.draw());
        //i deduct a kill when i get killed myself to not have both loss and achievements pop
        if (killed) totalKills--;
        document.querySelector('#score').innerText = playerScore;
        document.querySelector('.gmode').disabled = false;
        document.querySelector('.loss_modal').style.display = 'block';
        document.querySelector('.loss_modal span').innerText = playerScore;
        updateHighscores(playerScore, gameMode);
        playerImage.remove();
        document.querySelector('.boardModal').style.display = 'grid';
        gameIsPlayed = false;
        document.querySelector('#gmode-help').classList = 'hidden';
        return;
        // show the button
    }
    pieces.map((p) => p.checkAlive());
    let diffScore = pieces.reduce((p, i) => p + protopieces[i.type].value, 0);
    if (diffScore < targetDiffScore) {
        let spawnArr = [];
        for (let i of protoArr) {
            for (let j = 0; j < i[1].spawnTries; j++) {
                spawnArr.push(i[0]);
            }
        }

        let randomPiece = spawnArr[Math.floor(Math.random() * spawnArr.length)];
        let allowSpawnLocations = [];
        for (let i = 0; i < 49; i++)
            if (!isOccupied(i)) allowSpawnLocations.push(i);
        if (allowSpawnLocations.length) {
            let randomPosition =
                allowSpawnLocations[
                    Math.floor(Math.random() * allowSpawnLocations.length)
                ];
            let newPiece = new Piece(randomPiece, randomPosition);
            newPiece.deploymentCounter = 1; //time until new piece spawns
            pieces.push(newPiece);
        }
    }

    // repopulate occupied squares
    pieces.map((p) => p.draw());

    targetDiffScore += 0.5;
    playerScore++;
    checkAchievements();
    drawPlayer();

    if (!isForfeited) {
        startMoveTimer();
        setTimeout(arcadeModeExec, 2500);
    }
}
