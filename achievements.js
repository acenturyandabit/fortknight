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
    }
}

let playerLazyMoves = 0;
let playerLazyLastSquare = -1;

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
}

function achievementUnlock(name, descr) {
    document.querySelector(".ach_modal").style.display = "grid";
    document.querySelector("#ach_modal_name").innerText = name;
    document.querySelector("#ach_modal_descr").innerText = descr;
    renderHighscores();
}

function dismissModal() {
    document.querySelector(".ach_modal").style.display = "none";
}