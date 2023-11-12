const AppEasy = document.querySelector(".App-easy");
const AppMedium = document.querySelector(".App-medium");
const AppHard = document.querySelector(".App-hard");
const AppStart = document.querySelector(".App-start");
const AppHeader = document.querySelector(".App-header h2");
const AppBoard = document.querySelector(".App-board");

const difficultyLevelButtons = [AppEasy, AppMedium, AppHard];

const difficultyLevel = {
  easy: {
    rows: 6,
    cols: 6,
    mines: 5,
  },
  medium: {
    rows: 8,
    cols: 8,
    mines: 10,
  },
  hard: {
    rows: 10,
    cols: 10,
    mines: 15,
  },
};
let selectedLevel = difficultyLevel.easy;
let difficultyLabel = "easy";

function setDifficulty(difficulty) {
  difficultyLabel = difficulty;
  selectedLevel = difficultyLevel[difficulty];
  difficultyLevelButtons.forEach((button) =>
    button.classList.remove("btn-active")
  );
  document.querySelector(`.App-${difficulty}`).classList.add("btn-active");
}

AppEasy.addEventListener("click", () => {
  setDifficulty("easy");
});
AppMedium.addEventListener("click", () => {
  setDifficulty("medium");
});
AppHard.addEventListener("click", () => {
  setDifficulty("hard");
});

function howManyMinesAround(field) {
  let minesAround = 0;
  const row = field.getAttribute("data-row");
  const col = field.getAttribute("data-col");

  console.log("sada", row, col);

  if (
    document
      .querySelector(`.field[data-row="${row - 1}"][data-col="${col - 1}"]`)
      .classList.contains("mine")
  ) {
    minesAround++;
  }
  if (
    document
      .querySelector(`.field[data-row="${row - 1}"][data-col="${col}"]`)
      .classList.contains("mine")
  ) {
    minesAround++;
  }
  if (
    document
      .querySelector(`.field[data-row="${row - 1}"][data-col="${col + 1}"]`)
      .classList.contains("mine")
  ) {
    minesAround++;
  }
  if (
    document
      .querySelector(`.field[data-row="${row}"][data-col="${col - 1}"]`)
      .classList.contains("mine")
  ) {
    minesAround++;
  }
  if (
    document
      .querySelector(`.field[data-row="${row}"][data-col="${col}"]`)
      .classList.contains("mine")
  ) {
    minesAround++;
  }
  if (
    document
      .querySelector(`.field[data-row="${row}"][data-col="${col + 1}"]`)
      .classList.contains("mine")
  ) {
    minesAround++;
  }
  if (
    document
      .querySelector(`.field[data-row="${row + 1}"][data-col="${col - 1}"]`)
      .classList.contains("mine")
  ) {
    minesAround++;
  }
  if (
    document
      .querySelector(`.field[data-row="${row + 1}"][data-col="${col}"]`)
      .classList.contains("mine")
  ) {
    minesAround++;
  }
  if (
    document
      .querySelector(`.field[data-row="${row + 1}"][data-col="${col + 1}"]`)
      .classList.contains("mine")
  ) {
    minesAround++;
  }

  return minesAround;
}

function createBoard(width, height) {
  AppBoard.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  AppBoard.style.gridTemplateRows = `repeat(${height}, 1fr)`;
  AppBoard.innerHTML = "";
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      // AppBoard.style.display = 'block';
      let cell = document.createElement("div");
      cell.classList.add("field");
      cell.setAttribute("data-row", i);
      cell.setAttribute("data-col", j);
      AppBoard.append(cell);
    }
  }
  addMines(selectedLevel.mines);
}

function activeMinesFields() {
  minesFields.forEach((field) => {
    field.addEventListener("click", (e) => {
      if (e.target.classList.contains("mine")) {
        showLoseGameView();
      }
    });
  });

  const fileds = document.querySelectorAll(".field");
  fileds.forEach((field) => {
    // console.log(field, howManyMinesAround(field));
    field.innerText = howManyMinesAround(field);
  });
}
function showMines() {
  minesFields.forEach((field) => {
    field.classList.add("mine-active");
  });
}

let minesFields;

function addMines(mines) {
  const fields = document.querySelectorAll(".field");
  // let minesPlaced = 0;
  // while (minesPlaced < mines) {
  //   fields[minesPlaced].classList.add("mine");
  //   minesPlaced++;
  // }
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    let randomField = Math.floor(Math.random() * fields.length);
    if (!fields[randomField].classList.contains("mine")) {
      fields[randomField].classList.add("mine");
      minesPlaced++;
    }
  }
  minesFields = document.querySelectorAll(".mine");
  activeMinesFields();
}

// Generate a board with the selected difficulty
class Board {
  constructor(width, height, mines) {
    this.width = width;
    this.height = height;
    this.mines = mines;
  }
  generateBoard() {
    const board = [];
    for (let i = 0; i < this.height; i++) {
      board[i] = [];
      for (let j = 0; j < this.width; j++) {
        board[i][j] = {
          value: 0,
          isMine: false,
          isOpen: false,
          isFlag: false,
        };
      }
    }
    return board;
  }
}

let seconds = 0,
  minutes = 0,
  time;

function addZero(number) {
  return number < 10 ? "0" + number : number;
}

const timer = setInterval(() => {
  time++;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.querySelector(".App-timer").innerHTML = `${
    addZero(minutes) || "00"
  }:${addZero(seconds) || "00"}`;
}, 1000);

function showGameView() {
  const AppTimer = document.querySelector(".App-timer");
  time = 0;
  AppTimer.classList.remove("hided");
  AppHeader.innerText = `Minesweeper difficulty: ${difficultyLabel}`;
}

function showLoseGameView() {
  const AppTimer = document.querySelector(".App-timer");
  clearInterval(timer);
  showMines();
  AppHeader.innerText = `You lose!`;
}

function start() {
  showGameView();
  createBoard(selectedLevel.rows, selectedLevel.cols);
}

AppStart.addEventListener("click", start);
