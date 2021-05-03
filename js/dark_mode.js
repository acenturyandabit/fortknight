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
            document.querySelectorAll(selector + ":not(.fixed-color)").forEach((element) => {
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