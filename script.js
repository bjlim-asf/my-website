const words = ["apple", "banana", "grape", "orange", "kiwi", "peach", "mango"];
const secretWord = words[Math.floor(Math.random() * words.length)];
const maxAttempts = 5;
let attemptsLeft = maxAttempts;

console.log("Secret word for testing:", secretWord); 

const hint = document.getElementById("hint");
hint.textContent = `Hint: The word starts with '${secretWord.charAt(0).toUpperCase()}'`;

const input = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

submitBtn.addEventListener("click", handleGuess);
restartBtn.addEventListener("click", restartGame);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") handleGuess();
});

function handleGuess() {
  const userGuess = input.value.trim().toLowerCase();
  input.value = ""; 

  if (userGuess === "") {
    attemptsLeft--;
    updateMessage("Incorrect guess. You have " + attemptsLeft + " attempts left. Try again!");
  } else if (userGuess === secretWord) {
    updateMessage("🎉 Congratulations! You guessed the secret word!", true);
    endGame(true);
  } else {
    attemptsLeft--;
    if (attemptsLeft > 0) {
      updateMessage("Incorrect guess. You have " + attemptsLeft + " attempts left. Try again!");
    } else {
      updateMessage("💀 Game over! The secret word was '" + secretWord + "'.", false);
      endGame(false);
    }
  }
}

function updateMessage(msg, won = false) {
  message.textContent = msg;
  message.className = won ? "win" : attemptsLeft === 0 ? "lose" : "";
}

function endGame(won) {
  submitBtn.disabled = true;
  input.disabled = true;
  restartBtn.style.display = "inline-block";
}

function restartGame() {
  window.location.reload();
}