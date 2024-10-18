const testAchButton = document.querySelector('#test-button');

testAchButton.addEventListener('click', () => {
    achievementUnlock(
        highscoreDict.achievementProgress['lazy'].achievementName,
        highscoreDict.achievementProgress['lazy'].achievementDescrption
    );
});
