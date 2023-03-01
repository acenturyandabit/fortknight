const playerMoveMatrix = [
    [ 1,  2],
    [-1,  2],
    [-2,  1],
    [-2, -1],
    [-1, -2],
    [ 1, -2],
    [ 2, -1],
    [ 2,  1],
];

function playerCanMove(x, y) {
	if (x >= 0 && x <= 6 && y >= 0 && y <= 6) {
        return true;
    }

    return false;
}

function coordsTo2D(index) {
    return [
        index % 7,
        Math.floor(index / 7)
    ];
}

function coordsTo1D(x, y) {
    return y * 7 + x;
}