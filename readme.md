# Fortknight

A whimsical battle royale game. Playing is half the fun; the other half is learning to code by adding to our wide array of achievements and submitting a pull request!

To play: https://acenturyandabit.github.io/fortknight

Try and beat my high score of 50! Then, pick an achievement to TODO below!



## todo
- achievements
    - progress achievements
        - journey of 1000 steps [DONE]
        - x-slayer [DONE]
    - board achievements
        - coronation: 5 kings on the board at a time.
        - parapets: 5 rooks on the board at a time.
        - cathedral: 5 bishops on the board at a time.
        - bar fight: 5 pawns on the board at the same time.
        - barracks: 3 pawns on board at the same time, in non-drunk mode
        - stables: 5 knights on the board at the same time.
        - queens
            - endgame: 3 queens on the board at a time
            - no place to hide: 4 queens on the board at a time
            - helltaker: 5 queens on the board at a time
    - boxed-in achievements
        - cornered: adjacent to 3 pieces
        - straightjacket: adjacent to 4 pieces
        - no safe spaces to move to for 3 consecutive turns, outside of drunk mode
    - "they're watching": knight is endangered n consecutive times
    - "sniped": get killed by a piece from 7 squares away
    - "cradle to grave": kill n pieces immediately after they become big
    - "can't take it": all pieces are protected by another piece 
    - immovable object: stand in front of a pawn
    - close shave: in strategist mode, stand in the path of a piece but be saved by the movement of another
- arcade mode
    - pieces move on a timer instead of in turns
    - sideways pawns?
- UX shenanigans
    - add new highscore message when highscore is reached
- requires external server (I'm happy to provide a nodejs server - just give me code)
    - global highscore
    - global 'achievement get' counts
- promotion and advertisment
    - talk to rebus squad about becoming step 2


## Build tools
`./images/compile_imgs.js`: run in this directory to preload svgs into the html file.

credits to wikimedia commons for chess pieces
