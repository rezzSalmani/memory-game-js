const $ = document;
const emojis = [
  "🐵",
  "🐶",
  "🐺",
  "🐱",
  "🦁",
  "🐮",
  "🐭",
  "🐻",
  "🐼",
  "🦄",
  "🐔",
  "🐯",
  "🦊",
  "🐷",
];
const logInBox = $.querySelector(".starter-box");
const gameLevelInput = $.querySelector("#gameLevel");
const gameBox = $.querySelector(".game-box");
const gameContainer = $.querySelector(".game-container");
const userInput = $.querySelector("#username-input");
const startBtn = $.querySelector(".start-btn");
const counter = $.querySelector(".counter");
const endGameModal = $.querySelector(".end-game-modal");
const restartGameBtn = $.querySelector(".end-game-modal button");
let playerName;

let firstCard, secondCard;
let seconds = 0,
  minutes = 0;

let movesCount = 0,
  winCounts = 0;

let secondsValue, minutesValue;
let timerInterval;

const timeGenerator = () => {
  seconds++;
  if (seconds >= 60) {
    minutes++;
    seconds = 0;
  }
  secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  $.querySelector(".timer").textContent = `${minutesValue}:${secondsValue} sec`;
};

// user input name
userInput.addEventListener("input", (event) => {
  const inputUser = event.target.value.trim();
  const inputLevel = gameLevelInput.value;
  if (
    inputUser.length > 3 &&
    (+inputLevel === 4 || +inputLevel === 8 || +inputLevel === 12)
  ) {
    startBtn.classList.remove("button-disable");
    startBtn.removeAttribute("disabled");
  } else {
    startBtn.classList.add("button-disable");
    startBtn.setAttribute("disabled", "true");
  }
});
// game level input change
gameLevelInput.addEventListener("change", (event) => {
  let inputUser = userInput.value.trim();
  const inputLevel = event.target.value;

  if (
    inputUser.length > 3 &&
    (+inputLevel === 4 || +inputLevel === 8 || +inputLevel === 12)
  ) {
    startBtn.classList.remove("button-disable");
    startBtn.removeAttribute("disabled");
  } else {
    startBtn.classList.add("button-disable");
    startBtn.setAttribute("disabled", "true");
  }
});
// Start Game
startBtn.addEventListener("click", () => {
  if (userInput.value.trim().length < 3) return;

  playerName = userInput.value.trim();
  // set player name
  $.querySelector(".username").textContent = playerName;

  // set game difficulty
  gameContainer.setAttribute("data-level", gameLevelInput.value);

  logInBox.classList.add("hide-box");

  setTimeout(() => {
    gameBox.classList.remove("hide-box");
  }, 300);

  generateGame();
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  timerInterval = setInterval(timeGenerator, 1000);
});

const generateRandomOptions = (array, count) => {
  const cloneArray = [...array];
  const randomEmojis = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * cloneArray.length);

    randomEmojis.push(cloneArray[randomIndex]);
    cloneArray.splice(randomIndex, 1);
  }
  return randomEmojis;
};
const shuffle = (array) => {
  const cloneArray = [...array];
  for (let i = 0; i < cloneArray.length - 1; i++) {
    const randomIndex = Math.floor(Math.random() * i + 1);
    const randomItem = cloneArray[i];
    cloneArray[i] = cloneArray[randomIndex];
    cloneArray[randomIndex] = randomItem;
  }
  return cloneArray;
};

const generateGame = () => {
  const gameLevel = gameContainer.getAttribute("data-level");

  const randomEmojis = generateRandomOptions(emojis, gameLevel);

  const shuffleEmojis = shuffle([...randomEmojis, ...randomEmojis]);
  console.log(shuffleEmojis);
  const elements = shuffleEmojis.map((item) => {
    return `
    <div class="item-box" onclick='checkCard(this)'>
        <span class="item item-back">${item}</span>
        <span class="item item-front">?</span>
    </div> 
    `;
  });

  gameContainer.innerHTML = elements.join("");
};
function checkCard(element) {
  if (element.classList.contains("matched")) return;

  const isFlipped = !element.classList.contains("flipped");

  if (!firstCard && !secondCard && isFlipped) {
    movesCount++;
    element.classList.add("flipped");
    firstCard = element.firstElementChild.innerText;
    console.log(firstCard);
    //
  } else if (firstCard && !secondCard && isFlipped) {
    element.classList.add("flipped");
    movesCount++;
    secondCard = element.firstElementChild.innerText;
    console.log(secondCard);

    //
    if (firstCard === secondCard) {
      insertMatch(firstCard || secondCard);

      firstCard = null;
      secondCard = null;
    } else if (firstCard !== secondCard) {
      setTimeout(() => {
        foppedBackCards();
        firstCard = null;
        secondCard = null;
      }, 1000);
    }
  }
  if (!document.querySelectorAll(".item-box:not(.flipped)").length) {
    endGame();
  }
  counter.innerText = `${movesCount} moves`;
  // console.log(movesCount);
}

const insertMatch = (target) => {
  $.querySelectorAll(".item-box").forEach((item) => {
    if (item.firstElementChild.innerText === target) {
      item.classList.add("matched");
    }
  });
};
const foppedBackCards = () => {
  $.querySelectorAll(".item-box").forEach((item) => {
    if (!item.classList.contains("matched")) {
      item.classList.remove("flipped");
    }
  });
};

const endGame = () => {
  $.querySelector(
    ".endTime"
  ).textContent = `${minutesValue}:${secondsValue} sec`;
  gameBox.classList.add("hide-box");
  setTimeout(() => {
    endGameModal.setAttribute("open", "true");
  }, 1000);
};

restartGameBtn.addEventListener("click", () => {
  endGameModal.remove("open");
  setTimeout(() => {
    logInBox.classList.remove("hide-box");
  }, 500);
});
// $.querySelector(".username").addEventListener("click", function () {
//   console.log(this);
// });
generateGame();
