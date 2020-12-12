const achievementList = {
    "lazy": {
        achievementName: 'Lazy',
        achievementDescrption: "Don't move for 5 consecutive turns",
        achievementStatus: 'Locked'
    },
    "crowded": {
        achievementName: 'Crowded',
        achievementDescrption: 'Have 10 pieces on the board at the same time',
        achievementStatus: 'Locked'
    },
    "10slay": {
        achievementName: '10 Slayer',
        achievementDescrption: 'Kill 10 opposing pieces ',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 10
    },
    "100slay": {
        achievementName: '100 Slayer',
        achievementDescrption: 'Kill 100 opposing pieces',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 100
    },
    "500slay": {
        achievementName: '500 Slayer',
        achievementDescrption: 'Kill 500 opposing pieces',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 500
    },
    "1000steps": {
        achievementName: '1000 Steps',
        achievementDescrption: 'Walk a 1000 steps',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 1000
    }

}

let playerLazyMoves = 0;
let playerLazyLastSquare = -1;
let totalKills = 0;
let playerTotalSteps = 0;

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
    if (playerLazyMoves >= 5 && highscoreDict.achievementProgress['lazy'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['lazy'].achievementStatus = 'Unlocked';
        achievementUnlock(highscoreDict.achievementProgress['lazy'].achievementName,
            highscoreDict.achievementProgress['lazy'].achievementDescrption);
    }

    //crowded achievement
    if (pieces.length >= 10 && highscoreDict.achievementProgress['crowded'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['crowded'].achievementStatus = 'Unlocked';
        achievementUnlock(highscoreDict.achievementProgress['crowded'].achievementName,
            highscoreDict.achievementProgress['crowded'].achievementDescrption);
    }

    //slayer achievementStatus
    if (totalKills === 10 && highscoreDict.achievementProgress['10slay'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['10slay'].achievementStatus = 'Unlocked';
        highscoreDict.achievementProgress['10slay'].achievementProgress = totalKills;
        achievementUnlock(highscoreDict.achievementProgress['10slay'].achievementName,
            highscoreDict.achievementProgress['10slay'].achievementDescrption);
    }

    if (highscoreDict.achievementProgress['10slay'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['10slay'].achievementProgress = totalKills;
    }

    if (totalKills === 100 && highscoreDict.achievementProgress['100slay'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['100slay'].achievementStatus = 'Unlocked';
        highscoreDict.achievementProgress['100slay'].achievementProgress = totalKills;
        achievementUnlock(highscoreDict.achievementProgress['100slay'].achievementName,
            highscoreDict.achievementProgress['100slay'].achievementDescrption);
    }

    if (highscoreDict.achievementProgress['100slay'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['100slay'].achievementProgress = totalKills;
    }

    if (totalKills === 500 && highscoreDict.achievementProgress['500slay'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['500slay'].achievementStatus = 'Unlocked';
        highscoreDict.achievementProgress['500slay'].achievementProgress = totalKills;
        achievementUnlock(highscoreDict.achievementProgress['500slay'].achievementName,
            highscoreDict.achievementProgress['500slay'].achievementDescrption);
    }

    if (highscoreDict.achievementProgress['500slay'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['500slay'].achievementProgress = totalKills;
    }

    if (playerTotalSteps === 1000 && highscoreDict.achievementProgress['1000steps'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['1000steps'].achievementStatus = 'Unlocked';
        highscoreDict.achievementProgress['1000steps'].achievementProgress = playerTotalSteps;
        achievementUnlock(highscoreDict.achievementProgress['1000steps'].achievementName,
            highscoreDict.achievementProgress['1000steps'].achievementDescrption);
    }

    if (highscoreDict.achievementProgress['1000steps'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['1000steps'].achievementProgress = playerTotalSteps;
    }

    updateAchievements();
}

function achievementUnlock(name, descr) {
    document.querySelector(".ach_modal").style.visibility = "visible";
    document.querySelector("#ach_modal_name").innerText = name;
    document.querySelector("#ach_modal_descr").innerText = descr;
   
    updateAchievements();
    fade(document.querySelector(".ach_modal"));
    setTimeout(function(){ document.querySelector(".ach_modal").style.visibility = "hidden"; }, 2100);
    
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.05;
        
    }, 200);
}

/*function dismissModal() {
    document.querySelector(".ach_modal").style.display = "none";
}*/