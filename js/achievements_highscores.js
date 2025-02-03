
let achievementList = {}; // Initialize as an empty object

// Function to load achievements from JSON
function loadAchievementsFromJson(filePath) {
    fetch(filePath)  // Use fetch API to get the json file
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            achievementList = data; // Assign the loaded data to achievementList
            initializeAchievements(); // Call this function to set up the achievements
            renderHighscores(); // And render the highscores
        })
        .catch(error => {
            console.error("Error loading achievements:", error);
            // Handle the error, maybe use default achievements or display a message
            // For example:
            // achievementList = { /* default achievements */ };
            // initializeAchievements();
            // renderHighscores();

        });
}

function initializeAchievements() {
    for (const category in achievementList) {
        for (const achievement in achievementList[category].achievements) {
            const achData = achievementList[category].achievements[achievement];
            if (!highscoreDict.achievementProgress[achievement]) {
                highscoreDict.achievementProgress[achievement] = achData;
            }
            highscoreDict.achievementProgress[achievement].achievementName = achData.achievementName;
            highscoreDict.achievementProgress[achievement].achievementDescription = achData.achievementDescrption;
            highscoreDict.achievementProgress[achievement].achievementGoal = achData.achievementGoal;
        }
    }
}


function initializeAchievements() {
    for (const category in achievementList) {
        for (const achievement in achievementList[category].achievements) {
            const achData = achievementList[category].achievements[achievement];
            if (!highscoreDict.achievementProgress[achievement]) {
                highscoreDict.achievementProgress[achievement] = achData;
            }
            highscoreDict.achievementProgress[achievement].achievementName = achData.achievementName;
            highscoreDict.achievementProgress[achievement].achievementDescription = achData.achievementDescrption;
            highscoreDict.achievementProgress[achievement].achievementGoal = achData.achievementGoal;
        }
    }
}


let highscoreDict;
try {
    highscoreDict = JSON.parse(localStorage.getItem('fortknightHS'));
} catch (e) {}
highscoreDict = highscoreDict || {
    allScores: [],
    modeHighest: {},
    achievementProgress: {}, // Initialize as an empty object
};

// Call this function to load the achievements
loadAchievementsFromJson('achievements.json');

let playerLazyMoves = 0;
let playerLazyLastSquare = -1;
let totalKills = 0;
let playerTotalSteps = 0;
let playerThreatenedMoves = 0;
let combo = 0;

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

    //multi-kill achievementStatus
    checkAndProgress('triple_kill', combo, 3)
    checkAndProgress('penta_kill', combo, 5)
    checkAndProgress('hepta_kill', combo, 7)

    // all_pieces achievementStatus
    checkAndProgress('royal_pariah', new Set(pieces.map((obj) => obj.type)).size, 6)
    //test for is square safe
    if (isSquareSafe(playerIndex, pieces) == false) {
        playerThreatenedMoves++;
    } else {
        playerThreatenedMoves = 0;
    }
    
    checkAndProgress('threatened', playerThreatenedMoves, 5);
    if (gameMode == 'drunk') {
        checkAndProgress('your_lucky_day', playerThreatenedMoves, 3);
    }
    updateAchievements();
}

function checkAndProgress(ach, variable, limit) {
    if (
        variable >= limit &&
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
            ach.hasOwnProperty('achievementGoal') &&
            ach.achievementProgress && 
            ach.achievementGoal // We've been having some problems with undefined 
        ) {
            achievementPercent = ach.achievementProgress / ach.achievementGoal;
        } else if (ach.achievementStatus=="Locked"){
            /*if just an achievement that needs to be unlocked, set the default to 0% 
                to send it to the bottom of the achievement list*/
            achievementPercent = 0;
        }else{
            achievementPercent=1;
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


// Add event listeners for the buttons
document.getElementById('viewByProgress').addEventListener('click', () => {
    renderAchievements('progress');
});

document.getElementById('viewByCategory').addEventListener('click', () => {
    renderAchievements('category');
});

// Modified renderAchievements function
function renderAchievements(mode) {
    const container = document.querySelector('.achievements-list');
    container.innerHTML = '';

    if (mode === 'progress') {
        const achievements = Object.values(highscoreDict.achievementProgress);
        achievements.sort((a, b) => (b.achievementProgress || 0) - (a.achievementProgress || 0));
        achievements.forEach(ach => {
            container.innerHTML += `
                <div>
                    <strong>${ach.achievementName}</strong>
                    Status: ${ach.achievementStatus}<br>
                    Progress: ${ach.achievementProgress || 0}/${ach.achievementGoal || 0}
                </div>`;
        });
    } else if (mode === 'category') {
        for (const category in achievementList) {
            container.innerHTML += `<h3>${category}</h3>`;
            achievementList[category].achievements.forEach(ach => {
                container.innerHTML += `
                    <div>
                        <strong>${ach.achievementName}</strong>: ${ach.achievementDescrption}<br>
                        Status: ${highscoreDict.achievementProgress[ach.achievementName]?.achievementStatus || 'Locked'}
                    </div>`;
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderAchievements('progress');
});

renderHighscores();
