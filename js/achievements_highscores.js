const achievementList = {
    lazy: {
        achievementName: 'Lazy',
        achievementDescrption: "Don't move for 5 consecutive turns",
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 5,
    },
    crowded: {
        achievementName: 'Crowded',
        achievementDescrption: 'Have 10 pieces on the board at the same time',
        achievementStatus: 'Locked',
    },
    coronation: {
        achievementName: 'Coronation',
        achievementDescrption: 'Have 5 kings on the board at the same time',
        achievementStatus: 'Locked',
    },
    parapets: {
        achievementName: 'Parapets',
        achievementDescrption: 'Have 5 rooks on the board at the same time',
        achievementStatus: 'Locked',
    },
    cathedral: {
        achievementName: 'Cathedral',
        achievementDescrption: 'Have 5 bishops on the board at the same time',
        achievementStatus: 'Locked',
    },
    bar_fight: {
        achievementName: 'Bar Fight',
        achievementDescrption: 'Have 5 pawns on the board at the same time',
        achievementStatus: 'Locked',
    },
    barracks: {
        achievementName: 'Barracks',
        achievementDescrption: 'Have 3 pawns on the board at the same time (non-drunk mode)',
        achievementStatus: 'Locked',
    },
    stables: {
        achievementName: 'Stables',
        achievementDescrption: 'Have 5 knights on the board at the same time',
        achievementStatus: 'Locked',
    },
    endgame: {
        achievementName: 'Endgame',
        achievementDescrption: 'Have 3 queens on the board at the same time',
        achievementStatus: 'Locked',
    },
    no_place_to_hide: {
        achievementName: 'No Place to Hide',
        achievementDescrption: 'Have 4 queens on the board at the same time',
        achievementStatus: 'Locked',
    },
    helltaker: {
        achievementName: 'Helltaker',
        achievementDescrption: 'Have 5 queens on the board at the same time',
        achievementStatus: 'Locked',
    },
    '10slay': {
        achievementName: '10 Slayer',
        achievementDescrption: 'Kill 10 opposing pieces ',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 10,
    },
    '100slay': {
        achievementName: 'Centurion',
        achievementDescrption: 'Kill 100 opposing pieces',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 100,
    },
    '500slay': {
        achievementName: 'Mountains of Ivory',
        achievementDescrption: 'Kill 500 opposing pieces',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 500,
    },
    '1000steps': {
        achievementName: 'Journey of 1000 Steps',
        achievementDescrption: 'Walk a 1000 steps',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 1000,
    },
    threatened: {
        achievementName: 'Living Dangerously',
        achievementDescrption: 'End your turn on a threatened square 5 times in a row.',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 5,
    },
};

let playerLazyMoves = 0;
let playerLazyLastSquare = -1;
let totalKills = 0;
let playerTotalSteps = 0;
let playerThreatenedMoves = 0;

function clearAchievementProgressAfterReset() {
    // When the game resets, this function is called
    playerLazyMoves = 0;
    playerLazyLastSquare = -1;
}

function checkAchievements() {
    //lazy achievement
    if (playerIndex === playerLazyLastSquare) {
        playerLazyMoves++;
    } else {
        playerLazyMoves = 0;
    }
    playerLazyLastSquare = playerIndex;
    checkAndProgress('lazy', playerLazyMoves, 5);

    checkAndUnlock('crowded', pieces.length, 10);

    //specific piece achievements
    checkAndUnlock('coronation', pieces.filter((obj) => obj.type === 'king').length, 5);
    checkAndUnlock('parapets', pieces.filter((obj) => obj.type === 'rook').length, 5);
    checkAndUnlock('cathedral', pieces.filter((obj) => obj.type === 'bishop').length, 5);
    checkAndUnlock('bar_fight', pieces.filter((obj) => obj.type === 'pawn').length, 5);
    if(gameMode != 'drunk') {
        checkAndUnlock('barracks', pieces.filter((obj) => obj.type === 'pawn').length, 3);
    }
    checkAndUnlock('stables', pieces.filter((obj) => obj.type === 'knight').length, 5);
    checkAndUnlock('endgame', pieces.filter((obj) => obj.type === 'queen').length, 3);
    checkAndUnlock('no_place_to_hide', pieces.filter((obj) => obj.type === 'queen').length, 4);
    checkAndUnlock('helltaker', pieces.filter((obj) => obj.type === 'queen').length, 5);    
    
    //slayer achievementStatus
    checkAndProgress('10slay', totalKills, 10);
    checkAndProgress('100slay', totalKills, 100);
    checkAndProgress('500slay', totalKills, 500);
    checkAndProgress('1000steps', playerTotalSteps, 1000);

    //test for is square safe
    if (isSquareSafe(playerIndex, pieces) == false) {
        playerThreatenedMoves++;
    } else {
        playerThreatenedMoves = 0;
    }
    checkAndProgress('threatened', playerThreatenedMoves, 5);
    updateAchievements();
}

function checkAndProgress(ach, variable, limit) {
    if (
        variable === limit &&
        highscoreDict.achievementProgress[ach].achievementStatus === 'Locked'
    ) {
        highscoreDict.achievementProgress[ach].achievementStatus = 'Unlocked';
        highscoreDict.achievementProgress[ach].achievementProgress = variable;
        achievementUnlock(
            highscoreDict.achievementProgress[ach].achievementName,
            highscoreDict.achievementProgress[ach].achievementDescrption
        );
    }

    if (highscoreDict.achievementProgress[ach].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress[ach].achievementProgress = variable;
    }
}

function checkAndUnlock(ach, variable, limit) {
    if (
        variable >= limit &&
        highscoreDict.achievementProgress[ach].achievementStatus === 'Locked'
    ) {
        highscoreDict.achievementProgress[ach].achievementStatus = 'Unlocked';
        achievementUnlock(
            highscoreDict.achievementProgress[ach].achievementName,
            highscoreDict.achievementProgress[ach].achievementDescrption
        );
    }
}

function achievementUnlock(name, descr) {
    document.querySelector('.ach_modal').style.visibility = 'visible';
    document.querySelector('#ach_modal_name').innerText = name;
    document.querySelector('#ach_modal_descr').innerText = descr;

    updateAchievements();
    fade(document.querySelector('.ach_modal'));
    setTimeout(function() {
        document.querySelector('.ach_modal').style.visibility = 'hidden';
    }, 2100);
}

function fade(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function() {
        if (op <= 0.1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ')';
        op -= op * 0.05;
    }, 200);
}

function dismissAchvModal() {
    document.querySelector('.ach_modal').style.visibility = 'hidden';
}

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

    achSortable.sort(function(ach1, ach2) {
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

renderHighscores();

