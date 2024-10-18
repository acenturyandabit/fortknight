// @ts-check

/**
 * @description
 * Check if the debug mode is enabled.
 * To enable the debug mode, add the query parameter "p=debug" to the URL.
 * Example: http://localhost:8000/?p=debug
 * @returns {boolean}
 */
function isDebugModeEnabled() {
  return "debug" === new URL(window.location.href).searchParams.get("p");
}

/**
 * @description
 * Reset the local storage (fortknightHS).
 */
function resetLocalStorage() {
  localStorage.removeItem("fortknightHS");
  location.reload();
}

/**
 * @description
 * Show the debug info in the debug tab.
 */
function showDebugInfo() {
  const debugTab = document.querySelector(".debug");
  if (debugTab) {
    debugTab.textContent = JSON.stringify(
      JSON.parse(localStorage.getItem("fortknightHS") ?? "{}"),
      undefined,
      2
    );
  } else {
    console.error("Debug tab not found.");
  }
}

/**
 * @description
 * Show the debug tab, if the debug mode is enabled.
 */
function showDebugTab() {
  if (isDebugModeEnabled()) {
    const debugTab = document.querySelector(".debugTab");
    if (debugTab) {
      debugTab.classList.remove("hidden");
    } else {
      console.error("Debug tab not found.");
    }
  }
}

/** event listeners */
document.querySelector("#show-debug")?.addEventListener("click", showDebugInfo);
document.querySelector("#reset-button")?.addEventListener("click", resetLocalStorage);

export { showDebugTab };
