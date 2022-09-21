class Gameboard {
    // tine harta cu x si 0
    //-1 spatiu gol
    // 0 este 0
    // 1 este X
    constructor() {
        this.boardArray = [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ]
    }

    isCellAvailable(indexOfCell) {
        if (this.boardArray[indexOfCell[0]][indexOfCell[1]] === -1) {
            return true;
        } else {
            return false;
        }
    }

    markCell(coordinates, optionOfPlayer) {
        if (this.isCellAvailable(coordinates)) {
            this.boardArray[coordinates[0]][coordinates[1]] = optionOfPlayer;
        }
    }

    checkIfGameOver() {

        let winningOption;
        //verific pe toate randurile
        this.boardArray.forEach(line => {
            let areCellsIdentical = true;

            for (let i = 0; i < line.length - 1; i++) {
                if (line[i] !== line[i + 1]) {
                    areCellsIdentical = false;
                    break;
                }
            }

            if (areCellsIdentical === true && line[0] !== -1) {
                winningOption = line[0];
                return winningOption;
            }

        })

        //verific pe toate coloanele    

        for (let j = 0; j < this.boardArray.length; j++) {
            let areCellsIdentical = true;
            for (let i = 0; i < this.boardArray.length - 1; i++) {
                if (this.boardArray[i][j] !== this.boardArray[i + 1][j]) {
                    areCellsIdentical = false;
                    break;
                }
            }
            if (areCellsIdentical === true && (this.boardArray[0][j] !== -1)) {
                winningOption = this.boardArray[0][j];
                return winningOption;
            }
        }

        this.checkFirstDiagonal();
        this.checkSecondDiagonal()
    }

    //verific pe cele doua diagnoale
    checkFirstDiagonal() {
        let winningOption;
        let areCellsIdentical = true
        for (let i = 0; i < this.boardArray.length - 1; i++) {
            if (this.boardArray[i][i] !== this.boardArray[i + 1][i + 1]) {
                areCellsIdentical = false;
                break;
            }
        }
        if (areCellsIdentical === true && this.boardArray[0][0] !== -1) {
            winningOption = this.boardArray[0][0];
            return winningOption;
        }
    }

    checkSecondDiagonal() {
        let winningOption;
        let areCellsIdentical = true;
        if (this.boardArray[0][2] !== this.boardArray[1][1] !== this.boardArray[2][0]) {
            areCellsIdentical = false;
            return;
        }

        if (areCellsIdentical === true && this.boardArray[0][2] !== -1) {
            winningOption = this.boardArray[0][2];
            return winningOption;
        }


    }
    clearBoard() {
        this.boardArray = [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ]
    }
    displayBoard() {
        console.log(this.boardArray);
    }
}

class Player {
    constructor(name, playerSymbol) {
        this.name = name;
        this.playerSymbol = playerSymbol;
    }

}

class GameController {

    constructor() {
        this.board = new Gameboard();
        this.player1 = new Player("Ale", "x");
        this.player2 = new Player("Stefan", "0");
        this.currentPlayer = this.player1;
    }

    makeMove(coordinateArray) {
        let gameStatus = this.board.checkIfGameOver();
        if (gameStatus === 0) {
            return `${this.player2.name} is the winner`;
        } else if (gameStatus === 1) {
            return `${this.player1.name} is the winner`;
        }

        let decodedPlayerOption;

        if (this.currentPlayer.playerSymbol === "x") {
            decodedPlayerOption = 1;
        } else {
            decodedPlayerOption = 0;
        }

        this.board.markCell(coordinateArray, decodedPlayerOption);

        this.switchPlayers();


    }

    switchPlayers() {
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
    }

    resetGame() {
        this.board.clearBoard();
    }
    displayBoard() {
        this.board.displayBoard();
    }
}

let newGame = new GameController();

let gameUi = document.querySelector(".game-ui");
let cells = document.querySelectorAll(".cell");
let restartButton = document.querySelector(".restart");
let displayWinner = document.querySelector(".announce-winner");
cells.forEach(cell => {

    cell.addEventListener('click', function (event) {
        
        let coordinatesArrayOfStrings = cell.getAttribute("coordinates").split(',');
        let coordinatesOfNumbers = [];
        coordinatesArrayOfStrings.forEach(element => {
            coordinatesOfNumbers.push(parseInt(element));
        })
    
        displayWinner.textContent = newGame.makeMove(coordinatesOfNumbers);
        if(event.target.textContent === ""){
            event.target.textContent = newGame.currentPlayer.playerSymbol; 

        }
         
        console.log(newGame.displayBoard());
    })
})
restartButton.addEventListener("click", function(){
    newGame.resetGame();
    cells.forEach( cell => {
        cell.textContent = "";
    })
  })


