console.log("Welcome to Tik Tac Toe Game!");
let image = new Image("res/excited.gif");
let bgAudio = new Audio("res/music.mp3");
let gameoverAudio = new Audio("res/gameover.mp3");
let selectAudio = new Audio("res/ting.mp3");
let playerTurn = "X";
let isGameover = false;
let resetBtn = document.getElementById("resetBtn");
let excitedImg = document.getElementById("excitedImg");


//  function to change player turn
function changePlayerTurn() {
    if (playerTurn == "X") {
        playerTurn = "O";
    }
    else {
        playerTurn = "X";
    }
}

// Check Winning
function checkWin() {
    let winCases = [
        // First 3 values reperesnt the box number and last 3 represents line that appears after winning
        // Horzintal winning case
        [0, 1, 2, 2, 3, 0],
        [3, 4, 5, 2, 10.4, 0],
        [6, 7, 8, 2, 17.5, 0],
        // vertical winning case
        [0, 3, 6, -5.5, 11, 90],
        [1, 4, 7, 1.5, 10.5, 90],
        [2, 5, 8, 8.6, 10.5, 90],

        // Diagonal winning case
        [0, 4, 8, 1.5, 10.5, 45],
        [2, 4, 6, 1.5, 10.5, 135]

    ]

    let boxTexts = document.getElementsByClassName("boxText"); // Getting all 9 boxTexts

    winCases.forEach((e) => {

        if (boxTexts[e[0]].innerHTML == boxTexts[e[1]].innerHTML && boxTexts[e[1]].innerHTML == boxTexts[e[2]].innerHTML && boxTexts[e[0]].innerHTML !== "") {
            isGameover = true;

            // Draw the line. each nested array's 3rd index represents distance from x, 4th index represents distance from y and 5th index represents rotation degree
            document.querySelector(".line").style.width = "18rem";
            document.querySelector(".line").style.transform = `translate(${e[3]}rem, ${e[4]}rem) rotate(${e[5]}deg)`;
        }
    });
}

function gameover() {
    gameoverAudio.play();
    document.getElementById("playerInfo").innerHTML = "<h3>Player " + playerTurn + " Won</h3>";

    excitedImg.style.width = "5rem";


}

let boxes = document.getElementsByClassName("box"); // Return a object of elements containing class boxText
// To use foreach loop first we transform object into array
Array.from(boxes).forEach(box => {

    // Select particular boxText
    let boxText = box.querySelector(".boxText");
    box.addEventListener('click', () => {

        // Check selected box contain empty textBox or not
        if (boxText.innerHTML == "" && !isGameover) {
            boxText.innerHTML = playerTurn;
            selectAudio.play();
            checkWin();

            if (!isGameover) {
                changePlayerTurn(playerTurn);
                document.getElementById("playerInfo").innerHTML = "Turn for Player:- " + playerTurn;
            }
            else {
                gameover();
            }
        }
    }
    )
});

// When player click on reset button
resetBtn.addEventListener('click', () => {
    let boxTexts = document.getElementsByClassName("boxText");
    Array.from(boxTexts).forEach((boxText) => {
        boxText.innerHTML = "";
    });
    playerTurn = "X";
    isGameover = false;
    excitedImg.style.width = "0";

    document.getElementById("playerInfo").innerHTML = "Turn for Player:- " + playerTurn;
    // Reset the line
    document.querySelector(".line").style.width = "0";


});