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

const debug = new URL(window.location.href).searchParams.get('p');
if (debug !== 'debug') {
    document.querySelector('.debugTab').style.display = 'none';
}