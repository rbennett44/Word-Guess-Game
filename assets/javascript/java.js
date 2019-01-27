
//Global Variables
//-------------------------------------------------------
//Arrays and Variables
var playersList = ["gretzky", "lemieux", "orr", "crosby", "lidstrom", "selanne", "mcdavid", "roy", "brodeur", "chara", "bergeron", "ovechkin",
"toews", "domi", "messier", "fuhr", "flurry"];
var chosenWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksSuccesses = [];
var wrongGuesses = [];

//Game Counters
var wins = 0;
var losses = 0; 
var guessesLeft = 9;

//Functions
//-------------------------------------------------------

function startGame () {
    chosenWord = playersList[Math.floor(Math.random() * playersList.length)];
    lettersInWord = chosenWord.split("");
    numBlanks = lettersInWord.length;

      //Reset
      guessesLeft = 9;
      wrongGuesses = []; 
      blanksSuccesses = [];

    //Populate blanksSuccesses
    for (var i = 0; i < numBlanks; i++) {
        blanksSuccesses.push("_");
    }

    //change HTML to reflect actual word picked
    document.getElementById("wordToGuess").innerHTML = blanksSuccesses.join(" ");
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("numwins").innerHTML = wins;
    document.getElementById("numLosses").innerHTML = losses;

    //testing
    console.log(chosenWord);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(blanksSuccesses);
  
}

function checkLetters(letter) {
  //check to see if letter exists in the word
    
    var isLetterInWord = false;

    for (var i = 0; i < numBlanks; i++){
        if (chosenWord[i] == letter) {
            isLetterInWord = true;
        }
    }

    //determine where the letter is in the word and populate blanksSuccesses
    if (isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if (chosenWord[i] == letter) {
                blanksSuccesses[i] = letter;
            }
        }
    }
    //When letter is not found
    else {
        wrongGuesses.push(letter);
        guessesLeft--
    }
    //Testing and Debugging
    console.log(blanksSuccesses);

};

function roundComplete() {
    console.log("Win Count: " + wins + " | Loss Count: " + losses + " | Guesses Left " + guessesLeft);

    //Update the HTML
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" ");


    //Check if user won
    if (lettersInWord.toString() == blanksSuccesses.toString()) {
        wins++;
        alert("You won! The name was " + chosenWord);

        //Update win counter
        document.getElementById("numwins").innerHTML = wins;
        startGame();
    }
    //Check if user lost
    else if (guessesLeft == 0) {

        losses;
        alert("You lost! The correct name was " + chosenWord);

        //Update losses counter
        document.getElementById("numLosses").innerHTML = losses;

        startGame();
    }
    
}
    
//Main Process
//-------------------------------------------------------
//Initiates the code for the first time
startGame();

//Register key clicks
document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
   checkLetters(letterGuessed);
   roundComplete();
    //test
    console.log(letterGuessed);
}