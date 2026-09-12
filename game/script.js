const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const pairsDisplay = document.getElementById("pairs");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

const symbols = [
    "🍎", "🍎",
    "🍌", "🍌",
    "🍇", "🍇",
    "🍉", "🍉",
    "🍓", "🍓",
    "🍒", "🍒",
    "🥝", "🥝",
    "🍍", "🍍"
];

let cards = [];
let firstCard = null;
let secondCard = null;
let locked = false;
let moves = 0;
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    board.innerHTML = "";

    cards = shuffle([...symbols]);

    cards.forEach((symbol, index) => {
        const card = document.createElement("div");

        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.textContent = "?";

        card.addEventListener("click", () => flipCard(card));

        board.appendChild(card);
    });
}

function flipCard(card) {
    if (
        locked ||
        card === firstCard ||
        card.classList.contains("matched")
    ) {
        return;
    }

    card.classList.add("flipped");
    card.textContent = card.dataset.symbol;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;

    movesDisplay.textContent = moves;

    checkMatch();
}

function checkMatch() {
    const isMatch =
        firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;
        pairsDisplay.textContent = matchedPairs;

        resetTurn();

        if (matchedPairs === 😎 {
            message.textContent =
               🎉 You won in ${moves} moves!`;
        }
    } else {
        locked = true;

        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            firstCard.textContent = "?";
            secondCard.textContent = "?";

            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    locked = false;
}

function restartGame() {
    moves = 0;
    matchedPairs = 0;

    movesDisplay.textContent = "0";
    pairsDisplay.textContent = "0";
    message.textContent = "";

    resetTurn();
    createBoard();
}

restartButton.addEventListener("click", restartGame);

createBoard();
