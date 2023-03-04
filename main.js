const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field{
    constructor(){
        this.field = [];
    }

    print() {
        for (let row of this.field){
          console.log(row.join(' '));
        }
    }

    calculateDimensions(){
        // Ask the player the dimensions of the board to play;
        let height = prompt("Hom many rows do you want? ");
        let width = prompt("How many columns do you want? ");
        const holes = 10;
        
        // Validation of input making sure that is a number and its over 0
        while( isNaN(parseInt(height)) || isNaN(parseInt(width)) || parseInt(height) < 0 || parseInt(width) < 0){
            if (isNaN(parseInt(height)) || parseInt(height) < 0){
                height = prompt("Please choose a number of rows: ");
            } else if (isNaN(parseInt(width)) || parseInt(height) < 0) {
                width = prompt("Please choose a number of columns: ");
            }
        }

        height = parseInt(height);
        width = parseInt(width);
        console.log(`${height}`);

        let newField = Array.from(Array(height), () => []);

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                newField[i].push(fieldCharacter)
                };
            };
        newField[0][0] = pathCharacter;
        this.field = newField;
    }

    playGame() {
        this.calculateDimensions();
        this.print(this.field)
    }

}
const game = new Field();

game.playGame();

