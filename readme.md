<div align="center">
<h1>Fortknight</h1>
<p>A whimsical battle royale game.</p>
<img src="https://user-images.githubusercontent.com/69604121/194764716-57497133-4bb9-44f1-b4f4-2279490e587b.png" alt="logo" height="400px" />

<a aria-label="last commit" href="https://github.com/acenturyandabit/fortknight/commits"><img src="https://img.shields.io/github/last-commit/acenturyandabit/fortknight.svg"></a>
<a aria-label="contributors graph" href="https://github.com/acenturyandabit/fortknight/graphs/contributors"><img src="https://img.shields.io/github/contributors/acenturyandabit/fortknight.svg"></a>
<a href="https://github.com/acenturyandabit/fortknight/pulse"><img src="https://img.shields.io/github/commit-activity/m/acenturyandabit/fortknight"></a>
<a href="https://acenturyandabit.github.io/fortknight"><img src="https://img.shields.io/website?down_message=offline&up_message=online&url=https%3A%2F%2Facenturyandabit.github.io%2Ffortknight"></a>
<a aria-label="license" href="https://github.com/acenturyandabit/fortknight/LICENSE"><img src="https://img.shields.io/github/license/acenturyandabit/fortknight.svg"></a>
<img src="https://img.shields.io/tokei/lines/github/acenturyandabit/fortknight">
</div>

Playing is half the fun; the other half is learning to code by adding to our wide array of achievements and submitting a pull request!

To play: https://acenturyandabit.github.io/fortknight

Try and beat my high score of 50! Then, pick a TODO item from the issues page to make a pull request for!


# Contents
- [About](#fortknight)
- [Contributing](#contributing)
    - [Adding Game Modes](#adding-game-modes)
    - [Adding Achievements](#adding-achievements)
    - [Testing](#testing)
    - [Please pay attention to](#please-pay-attention-to)
- [Looking For Maintainer](#looking-for-maintainer)
- [Build Tools](#build-tools)

## Contributing
While this repository is designed to be easyish to contribute to, it is not as easy as other pull-request-tutorials. You'll need to be able to write functional code in JS!

If you're looking for generic things to contribute to, you can try the below, and come back when you're more ready:
- [Open Pixel Art](https://github.com/twilio-labs/open-pixel-art)
- [Rebus](https://github.com/ollelauribostrom/rebus)

To get started on this project, simply [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) this repository and [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) it to your local device.

### Adding Game Modes
To add a game mode:
1. Add the game mode to [index.html](index.html)
2. Add the mode to the switch statement in [dom_events.js](/js/dom_events.js)
3. Edit [main.js](/js/main.js) to add the logic of your game mode (if your mode needs additional functions, create another js file in /js if possible)
4. If your mode changes the behavior of a piece, modify the respective piece in [piece_object.js](/js/piece_object.js)

### Adding Achievements
To add an achievement:
1. Go to [achievements_highscores.js](/js/achievements_highscores.js) and add it the achievementList
2. Add a checkAndUnlock or checkAndProgress function for it, and/or add your own logic if necessary

### Testing
You can easily test your changes locally by running index.html in a browser.

To enable optional debugging features and to view extended information on scores and achievements, you can add `?p=debug` to the end of the URL of your index.html.

![Debug.jpg](/images/debug.jpg)

To reset your high scores or achievements unlocked, you'll need to clear your browser's cache (which the debug mode provides a button for) or run the game in an incognito tab.

### Please pay attention to

1. Only commit files that you changed in a pull request. Dont commit files, you didn‘t change, because it messes up the complete branch and will not be merged by a maintainer!
2. Provide a good description for your issues and pull requests!
3. Dont create a pull request if you want to add a new feature, wich has no issue. First create a issue with a description of your new feature and then create a pull request wich links to it!
4. Test your code before you create a pull request. Your code needs to be fully working to get merged!

## LOOKING FOR MAINTAINER
If you want to be added to the project as a maintainer and help me merge pull requests, please drop a comment on issue #49 :D


## Build tools
`./images/compile_imgs.js`: run in this directory to preload svgs into the html file.

credits to wikimedia commons for chess pieces
