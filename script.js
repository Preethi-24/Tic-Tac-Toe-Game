var boxes = document.querySelectorAll(".box");
var newGameBtn = document.querySelector(".new-btn");
var resetBtn = document.querySelector(".reset-btn");
var msgContainer = document.querySelector(".msg-container");
var msg = document.querySelector(".msg");
var turnMsg = document.querySelector(".turn-msg");
var turnMsgSpan = turnMsg.querySelector("span"); // Get the span for color changes

var turn0 = true;
var count = 0;
var isGameOver = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to handle the state of the game board
const toggleBoxes = (disabled) => {
  for (let box of boxes) {
    box.disabled = disabled;
    if (!disabled) {
      box.innerText = "";
    }
  }
};

// Function to update the turn message and change the span color
const updateTurnMessage = () => {
  if (isGameOver) {
    turnMsgSpan.innerText = "";
    return;
  }

  if (turn0) {
    turnMsgSpan.innerText = "X";
    turnMsgSpan.classList.add("player-x");
    turnMsgSpan.classList.remove("player-o");
  } else {
    turnMsgSpan.innerText = "O";
    turnMsgSpan.classList.add("player-o");
    turnMsgSpan.classList.remove("player-x");
  }
};

const showResult = (message) => {
  msg.innerText = message;
  msgContainer.classList.remove("hide");
  isGameOver = true;
  toggleBoxes(true);
  updateTurnMessage(); // Hides the turn message
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [pos1, pos2, pos3] = pattern;
    if (
      boxes[pos1].innerText &&
      boxes[pos1].innerText === boxes[pos2].innerText &&
      boxes[pos2].innerText === boxes[pos3].innerText
    ) {
      showResult(`Congratulations, Winner is - ${boxes[pos1].innerText}`);
      return;
    }
  }
  if (count === 9) {
    showResult("Match is a Draw!");
  }
};

const resetGame = () => {
  turn0 = true;
  count = 0;
  isGameOver = false;
  toggleBoxes(false);
  msgContainer.classList.add("hide");
  updateTurnMessage(); // Resets the turn message to X's Turn
};

// Event Listeners
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "X";
    } else {
      box.innerText = "O";
    }
    box.disabled = true;
    turn0 = !turn0;
    count++;
    updateTurnMessage();
    checkWinner();
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Initial setup when the page loads
toggleBoxes(false);
updateTurnMessage();
