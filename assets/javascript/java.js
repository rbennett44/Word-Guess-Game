
//A list of the players on my son's hockey team
var teamList = ["jd", "kyler", "wyatt", "tyler", "parker", "zack", "jennah", "jacob", "preston", "paul",
                "robby", "steven", "jaden", "ky", "colin", "caden", "aiden", "john", "corban", "miles", "trevor",
                "adam"];

//the computer chooses one of the names of the players                
var chosenWord = "";

//the computer parses ou the letters in the chosen player's name
var lettersInChosenWord = [];

//store the number of blanks needed for each word
var numBlanks = 0;

//number of blanks the user guesses right
var blanksAndSuccesses = [];

//number of letters user guesses wrong
var wrongGuesses = [];

//stores the letters guessed
var lettersGuessed = "";


//setting up the counters of wins, losses and number of guesses remaining
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;


function startGame() {
    //count down from number of guesses
    numGuesses = 9;
    //computer randomly selects from list of players
    chosenWord = teamList[Math.floor(Math.random() * teamList.length)];
    //splits the name chosen into individual letters
    lettersInChosenWord = chosenWord.split("");
    //set the number of blanks to match the name chosen
    numBlanks = lettersInChosenWord.length;

    console.log(chosenWord);

    blanksAndSuccesses = [];

    wrongGuesses = [];

    for(var i = 0; i < numBlanks; i++) {
        //push the "blanks" to be seen on the browser
        blanksAndSuccesses.push("_");
    }

    console.log(blanksAndSuccesses);

    document.getElementById("guesses-left").innerHTML = numGuesses;
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

//set how to match the letters or how to say you got the wrong one
function checkLetters(letter) {
    var letterInWord = false;

    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            letterInWord = true;
        }
    }

    if (letterInWord) {
        for (var j = 0; j < numBlanks; i++) {
            if (chosenWord[j] === letter) {
                blanksAndSuccesses[j] = letter;
            }
        }
        console.log(blanksAndSuccesses);
    }


    else {
        wrongGuesses.push(letter);
        numGuesses--;
    }
}

function roundComplete() {
    console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

    //get ready to post wins and losses
    document.getElementById("guesses-left").innerHTML = numGuesses;
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

    //if user wins, say "You Win!"
    if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
        winCounter++;
        alert("You Win!");
        //add one to the win
        document.getElementById("win-counter").innerHTML = winCounter;
        startGame();
    }
    //If they don't win, say "You Lose!"
    else if(numGuesses === 0) {
        lossCounter++;
        alert("You Lose!");
        //add one to the loss
        document.getElementById("losses-counter").innerHTML = lossCounter;
        startGame();
    }
}

//run the start of game function 
startGame();

document.onkeyup = function(event) {
    lettersGuessed = String.fromCharCode(event.which).toLowerCase();
    checkLetters(lettersGuessed);
    roundComplete();
};