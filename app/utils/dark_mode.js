// @ts-check

/**
 * @type {string}
 */
const DARK_MODE_KEY = "DARK_MODE_PREFERENCE";

// Wrappin in a function to keep the check box and local storage in sync
function setDarkMode() {
  localStorage.setItem(DARK_MODE_KEY, "dark");
  document.body.classList.add("dark");
}

function setLightMode() {
  localStorage.setItem(DARK_MODE_KEY, "light");
  document.body.classList.remove("dark");
}

/**
 * @description
 * Gets the dark mode input switch html element
 * @returns {HTMLInputElement | null}
 */
function getDarkModeSwitch() {
  return document.querySelector(".dark-mode-switch input");
}

/**
 * @desription Check if user has dark mode preference
 * We use localStorage to store user's dark mode preference
 * If the localStorage item is not we will set the default to user's system preference
 * @returns {boolean} - true if user has dark mode preference
 */
function checkDarkMode() {
  const darkModePreference = localStorage.getItem(DARK_MODE_KEY);
  if (!darkModePreference) {
    // as the dark mode key is not set, we will set it to user's system preference
    // return true if user's system preference is dark
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }
  return darkModePreference === "dark";
}

/**
 * @description
 * Switch dark mode on or off
 */
function switchDarkMode() {
  const darkModeSwitch = getDarkModeSwitch();
  darkModeSwitch?.checked ? setDarkMode() : setLightMode();
}

/**
 * @description
 * If user has dark mode preference, set dark mode
 * If user has light mode preference, set light mode
 * If localStorage item is not set, set user's system preference
 */
function persistDarkMode() {
  const darkModeSwitch = getDarkModeSwitch();
  if (darkModeSwitch) {
    darkModeSwitch.checked = checkDarkMode();
  }
  checkDarkMode() ? setDarkMode() : setLightMode();
}

/** event listener for dark mode switch */
getDarkModeSwitch()?.addEventListener("change", switchDarkMode);

export { checkDarkMode, persistDarkMode };
