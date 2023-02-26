function Piece(type, index) {
    this.index = index;
    this.type = type;
    this.icon = document.createElement('div');
    this.icon.appendChild(document.querySelector('#' + type).cloneNode());
    let turnOrder = document.createElement('div');
    turnOrder.style.background = 'white';
    this.icon.appendChild(turnOrder);
    this.icon.style.height = 'auto';
    this.icon.children[0].style.height = '2vh';
    this.icon.style.position = 'absolute';
    this.icon.style.transform = 'translate(-50%,-50%)';
    this.deploymentCounter = type == 'queen' ? 5 : 3; //PC changed this line 5:3 is original, 3 is time between spawns
    this.turnCount = 1

    if (this.type == "pawn") {
        if (Math.floor(this.index / 7) == 5) {
            this.upDirection = true;
            this.icon.appendChild(document.querySelector('#up_arrow').cloneNode())
        }
        else if (Math.floor(this.index / 7) == 1) {
            this.upDirection = false;
            this.icon.appendChild(document.querySelector('#down_arrow').cloneNode())
        }
    }

    this.checkAlive = () => {
        if (playerIndex != this.index) occupiedSquares.push(this.index);
        if(!playerIndex != this.index)
        {   // REMOVE BLUE SQUARE IN CASE OF DEATH
            if(this.index<7)
            {
               let sqr= document.querySelector(  `.board>div:nth-child(${42-(7*this.index)+1})` ) ;
               sqr.style.background = "";
            }
            else if(this.index>41)
            {
                let sqr= document.querySelector(`.board>div:nth-child(${342-(7*this.index)+1})`);
                sqr.style.background = "";
            }
            else if (this.index==7 || this.index==14 || this.index==21|| this.index==28|| this.index==35)
            {
                let sqr= document.querySelector( `.board>div:nth-child(${Math.round((0.142857*this.index)+42)+1})`);
                sqr.style.background ="";
            }
            else if (this.index==13 || this.index==20 || this.index==27|| this.index==34|| this.index==41|| this.index==48)
            {
                let sqr= document.querySelector(`.board>div:nth-child(${Math.round((0.142857*this.index)-0.857143)+1})`);
                sqr.style.background = ""; 
        }
    }
        return playerIndex != this.index;
    };
    this.move = () => {

        
        if(gameMode == "loop"){

            if(this.index<7)
            {
                this.index=42-(7*this.index);
            }
            else if(this.index>41)
            {
                this.index=342-(7*this.index);
            }
            else if (this.index==7 || this.index==14 || this.index==21|| this.index==28|| this.index==35)
            {
                this.index=Math.round((0.142857*this.index)+42);
            }
            else if (this.index==13 || this.index==20 || this.index==27|| this.index==34|| this.index==41|| this.index==48)
            {
                this.index=Math.round((0.142857*this.index)-0.857143);
            }

            this.removeblue();
            }  

        if (this.deploymentCounter == 0) {
            // check if player is on me
            // if so, return false
            // else
            // generate possible moves
            let possibleMoves = protopieces[this.type].generateMoves(this.index);
            possibleMoves = possibleMoves.filter((i) => !isOccupied(i));
            
            // Pawn edge case since these only move in one direction
            if (this.type == "pawn") {
                possibleMoves = possibleMoves.filter((i) => this.upDirection ? i < this.index : i > this.index)
            }

            if (!possibleMoves.length) return false; // die
            // check if I can hit player and not drunk
            if (possibleMoves.includes(playerIndex) && gameMode != 'drunk') {
                this.index = playerIndex;
                // if i can hit player, hit player
            } else {
                if(this.type == "pawn" && this.moved) { // Pawns: Only move every other turn
                    this.moved = false;
                    return false
                }
                this.index =
                possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            }
            this.moved = true;
            //Checking for Pawn-Promotion:
            if (this.type == "pawn") {
                let currentRow = Math.floor(this.index / 7);
                let promoting = currentRow == 0 || currentRow == 6;
                if (promoting) {
                    this.type = "queen";
                    this.icon.replaceChild(document.querySelector('#' + this.type).cloneNode(), this.icon.childNodes[0]);
                    this.icon.removeChild(this.icon.childNodes[2])
                }
            }

            return true;
        } else if (this.deploymentCounter > 1) {
            this.deploymentCounter--;
            return true;
        } else {
            this.icon.children[0].style.height = '5vh';
            this.deploymentCounter--;
            return true;
        }
    };

    this.removeblue= () =>{
        let sqr= document.querySelector(  `.board>div:nth-child(${this.index+1}`) ;
        if (sqr.style.background=="blue")
        {
            sqr.style.background='';
            console.log("none blue");
        }
    }
    // Part of is square safe
    this.canHitSquare = (SquareIndex) => {
        console.log('piece deployment counter', this.deploymentCounter);
        if (this.deploymentCounter <= 1) {
            // check if player is on me
            // if so, return false because square is safe as can continue moving
            // else
            // generate possible moves
            let possibleMoves = protopieces[this.type].generateMoves(this.index);
            possibleMoves = possibleMoves.filter((i) => !isOccupied(i));

            // Pawn edge case since these only move in one direction
            if (this.type == "pawn") {
                possibleMoves = possibleMoves.filter((i) => this.upDirection ? i < this.index : i > this.index)
            }

            if (!possibleMoves.length) return false; // die
            // check if I can hit the specified square
            if (possibleMoves.includes(SquareIndex) && gameMode != 'drunk') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    this.cleanup = () => {
        //this.icon.remove();
        if (this.type != 'pawn' || !this.moved) 
            this.moved = this.deploymentCounter != 0;
    };
    this.draw = () => {
        turnOrder.innerText = this.deploymentCounter;
        if (this.deploymentCounter == 0 && gameMode != 'strategist') {
            turnOrder.style.display = 'none';
        } else if (this.deploymentCounter == 0) {
            turnOrder.innerText = pieces.indexOf(this) + 1;
        }
        drawToIndex(this.icon, this.index);

        if(gameMode == "loop")
        {
            if(this.index<7)
            {
               let sqr= document.querySelector(  `.board>div:nth-child(${42-(7*this.index)+1})` ) ;
               sqr.style.background = "blue";
            }
            else if(this.index>41)
            {
                let sqr= document.querySelector(`.board>div:nth-child(${342-(7*this.index)+1})`);
                sqr.style.background = "blue";
            }
            else if (this.index==7 || this.index==14 || this.index==21|| this.index==28|| this.index==35)
            {
                let sqr= document.querySelector( `.board>div:nth-child(${Math.round((0.142857*this.index)+42)+1})`);
                sqr.style.background ="blue";
            }
            else if (this.index==13 || this.index==20 || this.index==27|| this.index==34|| this.index==41|| this.index==48)
            {
                let sqr= document.querySelector(`.board>div:nth-child(${Math.round((0.142857*this.index)-0.857143)+1})`);
                sqr.style.background = "blue";
            }
        }
    };
}
let isOccupied = (index) => {
    for (let i of pieces) {
        if (i.index == index) return true;
    }
    return gameMode != 'strategist' && occupiedSquares.indexOf(index) != -1;
};
let protopieces = {
    knight: {
        value: 3,
        spawnTries: 5,
        generateMoves: (index) => {
            let possibleMoves = [];
            /*Up two over one left*/
            if (index % 7 > 0 && Math.floor(index / 7) > 1) possibleMoves.push(-15);
            /*Up two over one right */
            if (index % 7 < 6 && Math.floor(index / 7) > 1) possibleMoves.push(-13);

            /*Left two up one*/
            if (index % 7 > 1 && Math.floor(index / 7) > 0) possibleMoves.push(-9);
            /*Right two up one*/
            if (index % 7 < 5 && Math.floor(index / 7) > 0) possibleMoves.push(-5);

            /*Right two down one*/
            if (index % 7 > 1 && Math.floor(index / 7) < 6) possibleMoves.push(5);
            /*Left two down one*/
            if (index % 7 < 5 && Math.floor(index / 7) < 6) possibleMoves.push(9);
            /*Down two over one right */
            if (index % 7 > 0 && Math.floor(index / 7) < 5) possibleMoves.push(13);
            /*Down two over one left*/
            if (index % 7 < 6 && Math.floor(index / 7) < 5) possibleMoves.push(15);
            possibleMoves = possibleMoves.map((i) => i + index);
            return possibleMoves;
        },
    },
    king: {
        value: 2,
        spawnTries: 6,
        generateMoves: (index) => {
            let possibleMoves = [];
            if (index % 7 > 0) possibleMoves.push(-1);
            if (index % 7 < 6) possibleMoves.push(1);
            if (Math.floor(index / 7) > 0) possibleMoves.push(-7);
            if (Math.floor(index / 7) < 6) possibleMoves.push(7);
            if (index % 7 > 0 && Math.floor(index / 7) > 0) possibleMoves.push(-8);
            if (index % 7 < 6 && Math.floor(index / 7) > 0) possibleMoves.push(-6);
            if (index % 7 > 0 && Math.floor(index / 7) < 6) possibleMoves.push(6);
            if (index % 7 < 6 && Math.floor(index / 7) < 6) possibleMoves.push(8);
            possibleMoves = possibleMoves.map((i) => i + index);
            return possibleMoves;
        },
    },
    rook: {
        value: 3,
        spawnTries: 4,
        generateMoves: (index) => {
            let possibleMoves = [];
            let left = index % 7,
                top = Math.floor(index / 7);
            for (let i = 0; i < top; i++) {
                let d = (index % 7) + (top - i - 1) * 7;
                if (!isOccupied(d)) possibleMoves.push(d);
                else break;
            }
            for (let i = 0; i < left; i++) {
                let d = index - (i + 1);
                if (!isOccupied(d)) possibleMoves.push(d);
                else break;
            }
            for (let i = 0; i < 6 - left; i++) {
                d = index + (i + 1);
                if (!isOccupied(d)) possibleMoves.push(d);
                else break;
            }
            for (let i = 0; i < 6 - top; i++) {
                d = (index % 7) + (top + i + 1) * 7;
                if (!isOccupied(d)) possibleMoves.push(d);
                else break;
            }
            return possibleMoves;
        },
    },
    bishop: {
        value: 3,
        spawnTries: 4,
        generateMoves: (index) => {
            let possibleMoves = [];
            let left = index % 7,
                top = Math.floor(index / 7);
            let idash = index;
            for (let i = 0; i < top && i < left; i++) {
                d = idash -= 8;
                if (!isOccupied(d)) possibleMoves.push(d);
                else break;
            }
            idash = index;

            for (let i = 0; i < 6 - top && i < 6 - left; i++) {
                d = idash += 8;
                if (!isOccupied(d)) possibleMoves.push(d);
                else break;
            }
            idash = index;

            for (let i = 0; i < top && i < 6 - left; i++) {
                d = idash -= 6;
                if (!isOccupied(d)) possibleMoves.push(d);
                else break;
            }
            idash = index;

            for (let i = 0; i < 6 - top && i < left; i++) {
                d = idash += 6;
                if (!isOccupied(d)) possibleMoves.push(d);
                else break;
            }
            return possibleMoves;
        },
    },
    queen: {
        value: 5,
        spawnTries: 1,
        generateMoves: (index) => {
            let possibleMoves = protopieces.bishop.generateMoves(index);
            possibleMoves.push(...protopieces.rook.generateMoves(index));
            return possibleMoves;
        },
    },
    pawn: {
        value: 1,
        spawnTries: 4,
        generateMoves: (index) => {
            let possibleMoves = []
            // Player Knight is not directly above or below the pawn. If it was, the pawn would not have any moves
            if (playerIndex - index != -7) possibleMoves.push(-7);
            if (playerIndex - index != 7) possibleMoves.push(7);

            // If the difference between White Knight and Pawn is 6 or 8 and the Pwan is not on either side border,
            // then the White Knight has to be diagonal from the pawn
            if (playerIndex - index == -6 && (index % 7 != 0 || index % 7 != 6) ) possibleMoves.push(-6);
            if (playerIndex - index == -6 && (index % 7 != 0 || index % 7 != 6) )possibleMoves.push(6);

            if (playerIndex - index == 8 && (index % 7 != 0 || index % 7 != 6) ) possibleMoves.push(8);
            if (playerIndex - index == -8 && index % 7 != 0) possibleMoves.push(-8);                    
            possibleMoves = possibleMoves.map((i) => i + index);
            return possibleMoves;
        }
    }
};
let protoArr = Object.entries(protopieces);