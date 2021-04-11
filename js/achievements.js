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
    achievementDescrption:
      'End your turn on a threatened square 5 times in a row.',
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
  setTimeout(function () {
    document.querySelector('.ach_modal').style.visibility = 'hidden';
  }, 2100);
}

function fade(element) {
  var op = 1; // initial opacity
  var timer = setInterval(function () {
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
