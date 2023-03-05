const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field{
    constructor(){
        this.field = [];
        this._x = 0;
        this._y = 0;
        this.keepPlaying = true;
    }

    print(data) {
        for (let row of data){
          console.log(row.join(' '));
        }
    }

    calculateDimensions(){
        // Ask the player the dimensions of the board to play;
        let height = prompt("Hom many rows do you want? ");
        let width = prompt("How many columns do you want? ");
       
        
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

        let newField = Array.from(Array(height), () => []);

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                newField[i].push(fieldCharacter)
                };
            };
        newField[0][0] = pathCharacter;

        let hatx = 0;
        // we make sure that hat is generate on the lower half of the field 
        while ( hatx < (height/2)){
            hatx = Math.floor(Math.random() * height);
        }
        const haty = Math.floor(Math.random() * width);
        newField[hatx][haty] = hat;

        this.field = newField;
        this._x = width;
        this._y = height;
    }

    checkDifficulty() {
        let level = prompt("Select difficulty easy, medium, hard: ").toLowerCase();
        let holes;
      
        while( level !== 'easy' && level !== 'medium' && level !== 'hard') {
                level = prompt("Come on mate select a Proper difficulty!! Easy, Medium or Hard: ").toLowerCase();
        }

        switch(level){
            case 'easy':
                holes = Math.floor(((this._x * this._y) * 20) / 100);
                break;
            case 'medium':
                holes = Math.floor(((this._x * this._y) * 30) / 100);
                break;
            case 'hard':
                holes = Math.floor(((this._x * this._y) * 45) / 100); 
                break;
            default:
                break;
        }
        
        let satisfied = false;
        let holeField;
        // with this while loo we are gonna validate the player is satisfied with the board set up;
        while (!satisfied){
            holeField = JSON.parse(JSON.stringify(this.field))

            for ( let k = holes; k > 0; k--){
                let holex = 0;
                let holey = 0;
                //while loop to make sure a hole doesnt fall on the hat position
                while(holeField[holex][holey] === pathCharacter || holeField[holex][holey] === hat || holeField[holex][holey] === hole){
                    holex = Math.floor(Math.random() * this._y);
                    holey = Math.floor(Math.random() * this._x);
                }
                holeField[holex][holey] = hole;
            }
            this.print(holeField);
            
            let answer = prompt("Would you like to reset the board? Y/N").toLowerCase();
            // validate acceptable player satisfaction answer
            while( answer !== 'y' && answer !== 'n'){
                answer = prompt('Sorry was that a yes?: ').toLowerCase();
            }

            if( answer === 'n') satisfied = true;
        }
        this.field = holeField;
      }

    letsMove() {
    let x = 0;
    let y = 0;

    while (this.keepPlaying) {
        this.print(this.field);
        var direction = prompt('Choose a direction Enter N for North, S for  South, E for East, or W for West. ').toLowerCase();
        
        switch(direction) {
          // for every case we make sure the next doesnt fall outside of the board as well as fall into a hole.
            case 'n':
                if (y === 0 || (this.field[x][y-1] === hole)) {
                    console.log('Wrong Move!!  \n Game Over');
                    this.keepPlaying = false;
                    break;
                  } else {
                    y -=1;
                    break;
                  }    
            case 's':
                if (y >= this.field.length || (this.field[y+1][x] === hole)) {
                    console.log('Wrong Move!! \n Game Over');
                    this.keepPlaying = false;
                    break;
                  } else {
                    y +=1;
                    break;
                  }
            case 'w':
                if (x === 0 || (this.field[y][x-1] === hole)) {
                    console.log('Wrong Move!! \n Game Over');
                    this.keepPlaying = false;
                    break;
                  } else {
                    x -= 1
                    break;
                  }
            case 'e':
                if (x >= this.field[y].length || (this.field[y][x+1] === hole)) {
                    console.log('Wrong Move!! \n Game Over');
                    this.keepPlaying = false;
                    break;
                  } else {
                    x += 1;
                    break;
                  }
            default:
                console.log('Please choose a valid direction');
                break;
        }
        if (this.field[y][x] === hat) {
            console.log('You found the hat! You win!');
            this.keepPlaying = false;
        } else {
            this.field[y][x] = pathCharacter
        }
    }
    }

    playGame() {
        this.calculateDimensions();
        this.checkDifficulty();
        this.letsMove()
    }

}
const game = new Field();

game.playGame();

