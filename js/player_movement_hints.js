function PlayerHighlighter() {
    this.showHighlight = false;
    this.movementPoints = [];
    this.nope = {}; // intervals for red squares

    this.getStatus = () => {
        return this.showHighlight;
    }

    this.enable = () => {
        console.log(1);
        if (!this.movementPoints.length) {
             this.generateMovmentProjection();
        }

        this.showHighlight = true;
        this.drawPossibleMoves();
    }

    this.disable = () => {
        this.showHighlight = false;
        this.hidePossibleMoves();
    }

    this.blinkInvalidMove = (sqIndex) => {
        const element = document.querySelector(
            `.board>div:nth-child(${sqIndex + 1})`
        );

        element.style.background = 'red';

        if (this.nope[sqIndex]) clearTimeout(this.nope[sqIndex]);

        this.nope[sqIndex] = setTimeout(() => {
            element.style.background = '';
        }, 1000);
    }

    this.drawPossibleMoves = () => {
        console.log
        const [playerX, playerY] = coordsTo2D(playerIndex);

        playerMoveMatrix.forEach(([dx, dy], idx) => {
            const tryX = playerX + dx;
            const tryY = playerY + dy;

            if(playerCanMove(tryX, tryY)) {
                drawToIndex(this.movementPoints[idx], coordsTo1D(tryX, tryY));
                this.showMovmentPointById(idx);
            } else {
                this.hideMovmentPointById(idx);
            }
        });
    }

    this.hidePossibleMoves = () => {
        this.movementPoints.forEach(point => (point.style.opacity = '0'));
    }

    this.showMovmentPointById = (id) => {
        this.movementPoints[id].style.opacity = '60';
    }

    this.hideMovmentPointById = (id) => {
        this.movementPoints[id].style.opacity = '0';
    }

    this.generateMovmentProjection = () => {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 8; i++) {
            const movementPoint = document.createElement("img");
            movementPoint.id = `mp${i + 1}`;
            movementPoint.className = 'movementProjection';
            movementPoint.style.position = 'absolute';
            movementPoint.style.transform = 'translate(-50%,-50%)';
            movementPoint.src = 'images/MovementProjection.svg';

            this.movementPoints.push(movementPoint);
            fragment.appendChild(movementPoint);
        }

        document.querySelector("#assets").appendChild(fragment);
    }
}

const PH = new PlayerHighlighter();