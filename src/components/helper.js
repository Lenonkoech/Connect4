//Dtermining a win condition
export const isWinner = (gameBoard, currentMove, currentPlayer) => {
    let board = [...gameBoard];//create copy of gameboard to avoid mutation
    board[currentMove] = currentPlayer;
    //Lines that determine A win
    const winLines = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12],
    ]

    for (let i = 0; i < winLines.length; i++) {
        const [c1, c2, c3, c4] = winLines[i];

        if (board[c1] > 0 &&
            board[c1] === board[c2] &&
            board[c2] === board[c3] &&
            board[c3] === board[c4]) {
            return true;
        }
    }
    return false;
}
//Determining a draw condition
export const isDraw = (gameBoard, currentMove, currentPlayer) => {
    let board = [...gameBoard];//create copy of gameboard to avoid mutation
    board[currentMove] = currentPlayer;

    let count = board.reduce((n, x) => n + (x === 0), 0);
    console.log(`count ${count}`);
    return count === 0;
}
//Basic AI player on suggest Button
const getRandomComputerMove = (gameBoard) => {
    let validMoves = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === 0) {
            validMoves.push(i);
        }
    }
    let randomMove = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomMove];
}

const getPosition = (gameBoard, moveChecks) => {
    for (let check = 0; check < moveChecks.length; check++) {
        for (let i = 0; i < moveChecks[check].max; i += moveChecks[check].step) {
            let series = gameBoard[i + moveChecks[check].indexes[0]].toString() +
                gameBoard[i + moveChecks[check].indexes[1]].toString() +
                gameBoard[i + moveChecks[check].indexes[2]].toString() +
                gameBoard[i + moveChecks[check].indexes[3]].toString()

            switch (series) {
                case "1110":
                case "2220":
                    return i + moveChecks[check].indexes[3];
                case "1101":
                case "2202":
                    return i + moveChecks[check].indexes[2];
                case "1011":
                case "2022":
                    return i + moveChecks[check].indexes[1];
                case "0111":
                case "0222":
                    return i + moveChecks[check].indexes[0];
                default:
            }
        }
    }
    return -1;
};
//Determining possible moves and how to counter them
export const getComputerMove = (gameBoard) => {
    let moveChecks = [
        // vertical
        {
            indexes: [0, 4, 8, 12],
            max: 4,
            step: 1,
        },
        //horizontal
        {
            indexes: [0, 1, 2, 3],
            step: 4,
            max: 16,
        },
        //diagonal
        {
            indexes: [0, 5, 10, 15],
            step: 16,
            max: 16,
        },
        {
            indexes: [3, 6, 9, 12],
            max: 16,
            step: 16,
        }
    ]
    let position = getPosition(gameBoard, moveChecks);
    if (position > -1)
        return position;
    return getRandomComputerMove(gameBoard);
}