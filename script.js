const maxAttempts = 3;
let attempts = 0;
let computerRandomNumber = 0;

const statusElement = document.getElementById("status");
const inputElement = document.getElementById("input");
const okBtnElement = document.getElementById("ok-btn");

function startGame() {
  showMessage(
    `Welcome to the Ultimate Number Guessing Game! You've got three chances to guess the hidden number between 1 and 10. Good luck.`,
    "black",
    "rgb(200, 200, 200)"
  );
  computerRandomNumber = Math.floor(Math.random() * 10) + 1;
  console.log(computerRandomNumber); // >> Cheat <<
  attempts = 0;
  inputElement.value = "";
  inputElement.placeholder = "Type your number here!";
  okBtnElement.removeEventListener("click", startGame);
  okBtnElement.addEventListener("click", playGame);
}

function playGame() {
  if (attempts >= maxAttempts) {
    showMessage(
      `Ops! You've used all your attempts. The correct number was ${computerRandomNumber}.`,
      "white",
      "crimson"
    );
    endGame();
  } else {
    const playerGuessNumber = parseInt(inputElement.value);
    if (
      isNaN(playerGuessNumber) ||
      playerGuessNumber < 1 ||
      playerGuessNumber > 10
    ) {
      showMessage(
        "Please enter a valid number between 1 and 10.",
        "white",
        "crimson"
      );
    } else {
      attempts++;
      if (playerGuessNumber === computerRandomNumber) {
        showMessage(
          `Congratulations, You guessed the correct number ${computerRandomNumber} with ${attempts} attempts.`,
          "white",
          "forestgreen"
        );
        endGame();
      } else if (playerGuessNumber < computerRandomNumber) {
        showMessage("Incorrect! Try a higher number.", "white", "orange");
      } else {
        showMessage("Incorrect! Try a lower number.", "white", "orange");
      }
      inputElement.value = "";
    }
  }
}

function showMessage(textMessage, textColor, backgroundColor) {
  statusElement.textContent = textMessage;
  statusElement.style.color = textColor;
  statusElement.style.backgroundColor = backgroundColor;
}

function endGame() {
  okBtnElement.removeEventListener("click", playGame);
  okBtnElement.addEventListener("click", startGame);
}

startGame();
