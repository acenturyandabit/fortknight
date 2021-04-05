let gameMode = 'classic';

function renderHighscores() {
  document.querySelector('#hiscore').innerText =
    highscoreDict.modeHighest[gameMode];
  document.querySelector('.ghscores').innerHTML = Object.entries(
    highscoreDict.modeHighest
  )
    .map((i) => `<p>${i[0]}:${i[1]}</p>`)
    .join('');
  document.querySelector('.allhscores').innerHTML = highscoreDict.allScores
    .map(
      (i) =>
        `<p>${i.gameMode}:${i.score}, on ${new Date(
          i.date
        ).toLocaleDateString()}</p>`
    )
    .join('');
  //sort the achievements by percentage
  let achSortable = [];
  for (achievement in highscoreDict.achievementProgress) {
    let ach = highscoreDict.achievementProgress[achievement];
    let achievementPercent;
    if (
      ach.hasOwnProperty('achievementProgress') &&
      ach.hasOwnProperty('achievementGoal')
    ) {
      achievementPercent = ach.achievementProgress / ach.achievementGoal;
    } else {
      /*if just an achievement that needs to be unlocked, set the default to 100% 
                    to make it stay at the top of the achievement list*/
      achievementPercent = 100;
    }
    highscoreDict.achievementProgress[
      achievement
    ].completionPercent = achievementPercent;
    highscoreDict.achievementProgress[achievement].achName =
      ach.achievementName;
    achSortable.push(highscoreDict.achievementProgress[achievement]);
  }

  achSortable.sort(function (ach1, ach2) {
    return ach2.completionPercent - ach1.completionPercent;
  });
  console.log(achSortable);

  document.querySelector('.achv').innerHTML = achSortable
    .map(
      (i) =>
        `<p><b>${i.achName}</b><br>` +
        `${i.achievementDescrption}<br>` +
        `${i.achievementStatus}<br>` +
        `${
          i.achievementProgress !== undefined
            ? `<div class="progressbar"><div style = "width: ${
                (i.completionPercent >= 1 ? 1 : i.completionPercent) * 100
              }%"> ` + `</div></div></p>`
            : ''
        }`
    )
    .join('');
}

function updateHighscores(playerscore, gamemode) {
  highscoreDict.modeHighest[gamemode] = Math.max(
    playerscore,
    highscoreDict.modeHighest[gamemode]
  );
  localStorage.setItem('fortknightHS', JSON.stringify(highscoreDict));
  renderHighscores();
}

function updateAchievements() {
  localStorage.setItem('fortknightHS', JSON.stringify(highscoreDict));
  renderHighscores();
}

let highscoreDict;
try {
  highscoreDict = JSON.parse(localStorage.getItem('fortknightHS'));
} catch (e) {}
highscoreDict = highscoreDict || {
  allScores: [
    /*{gameMode: "mode", score: 1111}*/
  ],
  modeHighest: {
    // auto populated below
    // "gamemode":score
  },
  achievementProgress: achievementList,
};

//if anyone has achievements in their cache that are in the old array form, get rid of them
if (highscoreDict.achievementProgress.constructor.name == 'Array') {
  highscoreDict.achievementProgress = {};
}

//merge achievements
for (let i in achievementList) {
  if (!highscoreDict.achievementProgress[i]) {
    highscoreDict.achievementProgress[i] = achievementList[i];
  }
  //update these two fields in case we want to rename anything.
  highscoreDict.achievementProgress[i].achievementName =
    achievementList[i].achievementName;
  highscoreDict.achievementProgress[i].achievementDescription =
    achievementList[i].achievementDescription;
  highscoreDict.achievementProgress[i].achievementGoal =
    achievementList[i].achievementGoal;
}
//i get the biggest one so i'm sure to get the right number
totalKills = highscoreDict.achievementProgress['500slay'].achievementProgress;
playerTotalSteps =
  highscoreDict.achievementProgress['1000steps'].achievementProgress;

for (let i of Array.from(document.querySelectorAll("input[name='diff']"))) {
  if (!highscoreDict.modeHighest[i.value])
    highscoreDict.modeHighest[i.value] = 0;
}

function showDebug() {
  document.querySelector('.debug').textContent = JSON.stringify(
    JSON.parse(localStorage.getItem('fortknightHS')),
    undefined,
    2
  );
}

const resetButton = document.querySelector('#reset-button');

resetButton.addEventListener('click', () => {
  localStorage.removeItem('fortknightHS');
  location.reload();
});

const testAchButton = document.querySelector('#test-button');

testAchButton.addEventListener('click', () => {
  achievementUnlock(
    highscoreDict.achievementProgress['lazy'].achievementName,
    highscoreDict.achievementProgress['lazy'].achievementDescrption
  );
});

renderHighscores();
function checkMode() {
  darkMode = document.querySelector('.dark-mode-switch input').checked;
  newColor = 'black';
  oldColor = 'white';
  if (darkMode) {
    newColor = 'white';
    oldColor = 'black';
  }
  ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'span'].forEach(
    (selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.style.color = newColor;
      });
    }
  );
  ['.sidebar>div>p'].forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.style.borderColor = newColor;
    });
  });
  ['body', '.sidebar>div'].forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.style.backgroundColor = oldColor;
    });
  });
}
document.querySelector('.dark-mode-switch input').onclick = () => {
  checkMode();
};

const debug = new URL(window.location.href).searchParams.get('p');
if (debug !== 'debug') {
  document.querySelector('.debugTab').style.display = 'none';
}

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
  clearAchievementProgressAfterReset();
}

function forfeitGame() {
  if (gameIsPlayed) {
    document.querySelector('.boardModal').style.display = 'grid';
    document.querySelector('.loss_modal').style.display = 'block';
    document.querySelector('.loss_modal span').innerText =
      playerScore + ' You have forfeited the game!';
    //updateHighscores(playerScore, gameMode);
    document.querySelector('.gmode').disabled = false;
    gameIsPlayed = false;
    document.querySelector('#gmode-help').classList = 'hidden';
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

function Piece(type, index) {
  this.index = index;
  this.type = type;
  this.icon = document.createElement('div');
  this.icon.appendChild(document.querySelector('#' + type).cloneNode());
  let turnOrder = document.createElement('div');
  turnOrder.style.background = 'white';
  this.icon.appendChild(turnOrder);
  this.icon.style.height = 'auto';
  this.icon.children[0].style.height = '2vh';
  this.icon.style.position = 'absolute';
  this.icon.style.transform = 'translate(-50%,-50%)';
  this.deploymentCounter = type == 'queen' ? 5 : 3;
  this.checkAlive = () => {
    if (playerIndex != this.index) occupiedSquares.push(this.index);
    return playerIndex != this.index;
  };
  this.move = () => {
    if (this.deploymentCounter == 0) {
      // check if player is on me
      // if so, return false
      // else
      // generate possible moves
      let possibleMoves = protopieces[this.type].generateMoves(this.index);
      possibleMoves = possibleMoves.filter((i) => !isOccupied(i));
      if (!possibleMoves.length) return false; // die
      // check if I can hit player and not drunk
      if (possibleMoves.includes(playerIndex) && gameMode != 'drunk') {
        this.index = playerIndex;
        // if i can hit player, hit player
      } else {
        this.index =
          possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      }
      this.moved = true;
      return true;
    } else if (this.deploymentCounter > 1) {
      this.deploymentCounter--;
      return true;
    } else {
      this.icon.children[0].style.height = '5vh';
      this.deploymentCounter--;
      return true;
    }
  };

  // Part of is square safe
  this.canHitSquare = (SquareIndex) => {
    console.log('piece deployment counter', this.deploymentCounter);
    if (this.deploymentCounter <= 1) {
      // check if player is on me
      // if so, return false because square is safe as can continue moving
      // else
      // generate possible moves
      let possibleMoves = protopieces[this.type].generateMoves(this.index);
      possibleMoves = possibleMoves.filter((i) => !isOccupied(i));
      if (!possibleMoves.length) return false; // die
      // check if I can hit the specified square
      if (possibleMoves.includes(SquareIndex) && gameMode != 'drunk') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  this.cleanup = () => {
    //this.icon.remove();
    this.moved = this.deploymentCounter != 0;
  };
  this.draw = () => {
    turnOrder.innerText = this.deploymentCounter;
    if (this.deploymentCounter == 0 && gameMode != 'strategist') {
      turnOrder.style.display = 'none';
    } else if (this.deploymentCounter == 0) {
      turnOrder.innerText = pieces.indexOf(this) + 1;
    }
    drawToIndex(this.icon, this.index);
  };
}
let isOccupied = (index) => {
  for (let i of pieces) {
    if (i.index == index) return true;
  }
  return gameMode != 'strategist' && occupiedSquares.indexOf(index) != -1;
};
let protopieces = {
  knight: {
    value: 3,
    spawnTries: 5,
    generateMoves: (index) => {
      let possibleMoves = [];
      /*Up two over one left*/
      if (index % 7 > 0 && Math.floor(index / 7) > 1) possibleMoves.push(-15);
      /*Up two over one right */
      if (index % 7 < 6 && Math.floor(index / 7) > 1) possibleMoves.push(-13);

      /*Left two up one*/
      if (index % 7 > 1 && Math.floor(index / 7) > 0) possibleMoves.push(-9);
      /*Right two up one*/
      if (index % 7 < 5 && Math.floor(index / 7) > 0) possibleMoves.push(-5);

      /*Right two down one*/
      if (index % 7 > 1 && Math.floor(index / 7) < 6) possibleMoves.push(5);
      /*Left two down one*/
      if (index % 7 < 5 && Math.floor(index / 7) < 6) possibleMoves.push(9);
      /*Down two over one right */
      if (index % 7 > 0 && Math.floor(index / 7) < 5) possibleMoves.push(13);
      /*Down two over one left*/
      if (index % 7 < 6 && Math.floor(index / 7) < 5) possibleMoves.push(15);
      possibleMoves = possibleMoves.map((i) => i + index);
      return possibleMoves;
    },
  },
  king: {
    value: 2,
    spawnTries: 6,
    generateMoves: (index) => {
      let possibleMoves = [];
      if (index % 7 > 0) possibleMoves.push(-1);
      if (index % 7 < 6) possibleMoves.push(1);
      if (Math.floor(index / 7) > 0) possibleMoves.push(-7);
      if (Math.floor(index / 7) < 6) possibleMoves.push(7);
      if (index % 7 > 0 && Math.floor(index / 7) > 0) possibleMoves.push(-8);
      if (index % 7 < 6 && Math.floor(index / 7) > 0) possibleMoves.push(-6);
      if (index % 7 > 0 && Math.floor(index / 7) < 6) possibleMoves.push(6);
      if (index % 7 < 6 && Math.floor(index / 7) < 6) possibleMoves.push(8);
      possibleMoves = possibleMoves.map((i) => i + index);
      return possibleMoves;
    },
  },
  rook: {
    value: 3,
    spawnTries: 4,
    generateMoves: (index) => {
      let possibleMoves = [];
      let left = index % 7,
        top = Math.floor(index / 7);
      for (let i = 0; i < top; i++) {
        let d = (index % 7) + (top - i - 1) * 7;
        if (!isOccupied(d)) possibleMoves.push(d);
        else break;
      }
      for (let i = 0; i < left; i++) {
        let d = index - (i + 1);
        if (!isOccupied(d)) possibleMoves.push(d);
        else break;
      }
      for (let i = 0; i < 6 - left; i++) {
        d = index + (i + 1);
        if (!isOccupied(d)) possibleMoves.push(d);
        else break;
      }
      for (let i = 0; i < 6 - top; i++) {
        d = (index % 7) + (top + i + 1) * 7;
        if (!isOccupied(d)) possibleMoves.push(d);
        else break;
      }
      return possibleMoves;
    },
  },
  bishop: {
    value: 3,
    spawnTries: 4,
    generateMoves: (index) => {
      let possibleMoves = [];
      let left = index % 7,
        top = Math.floor(index / 7);
      let idash = index;
      for (let i = 0; i < top && i < left; i++) {
        d = idash -= 8;
        if (!isOccupied(d)) possibleMoves.push(d);
        else break;
      }
      idash = index;

      for (let i = 0; i < 6 - top && i < 6 - left; i++) {
        d = idash += 8;
        if (!isOccupied(d)) possibleMoves.push(d);
        else break;
      }
      idash = index;

      for (let i = 0; i < top && i < 6 - left; i++) {
        d = idash -= 6;
        if (!isOccupied(d)) possibleMoves.push(d);
        else break;
      }
      idash = index;

      for (let i = 0; i < 6 - top && i < left; i++) {
        d = idash += 6;
        if (!isOccupied(d)) possibleMoves.push(d);
        else break;
      }
      return possibleMoves;
    },
  },
  queen: {
    value: 5,
    spawnTries: 1,
    generateMoves: (index) => {
      let possibleMoves = protopieces.bishop.generateMoves(index);
      possibleMoves.push(...protopieces.rook.generateMoves(index));
      return possibleMoves;
    },
  },
};
let protoArr = Object.entries(protopieces);
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
    (i) => (i.style.background = '')
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
      pieces.push(new Piece(randomPiece, randomPosition));
    }
  }

  // repopulate occupied squares
  pieces.map((p) => p.draw());

  targetDiffScore += 0.5;
  playerScore++;
  checkAchievements();
  drawPlayer();

  setTimeout(arcadeModeExec, 2500);
}

function arcadeModeCall() {
  if (gameMode == 'arcade') {
    arcadeModeExec();
  }
}
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
