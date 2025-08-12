const container = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const newGameBtn = document.getElementById("new-game");
let tiles = [];
let score = 0;

function createGrid() {
  container.innerHTML = "";
  tiles = [];
  score = 0;
  updateScore();
  for (let i = 0; i < 16; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = "";
    container.appendChild(tile);
    tiles.push(tile);
  }
  generate();
  generate();
}

function updateScore() {
  scoreDisplay.textContent = `امتیاز: ${score}`;
}

function generate() {
  const empty = tiles.filter(t => t.textContent === "");
  if (empty.length === 0) return;
  const rand = empty[Math.floor(Math.random() * empty.length)];
  const val = Math.random() < 0.9 ? 2 : 4;
  rand.textContent = val;
  rand.setAttribute("data-val", val);
}

function getRows() {
  return [0, 4, 8, 12].map(i => tiles.slice(i, i + 4));
}

function getCols() {
  return [0, 1, 2, 3].map(i => [tiles[i], tiles[i + 4], tiles[i + 8], tiles[i + 12]]);
}

function slide(line) {
  let nums = line.map(t => t.textContent).filter(n => n !== "");
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums[i] = String(Number(nums[i]) * 2);
      score += Number(nums[i]);
      nums.splice(i + 1, 1);
    }
  }
  while (nums.length < 4) nums.push("");
  line.forEach((t, i) => {
    t.textContent = nums[i];
    t.setAttribute("data-val", nums[i] || "");
  });
}

function move(dir) {
  let before = tiles.map(t => t.textContent);
  if (dir === "ArrowLeft") getRows().forEach(row => slide(row));
  if (dir === "ArrowRight") getRows().forEach(row => slide(row.reverse()));
  if (dir === "ArrowUp") getCols().forEach(col => slide(col));
  if (dir === "ArrowDown") getCols().forEach(col => slide(col.reverse()));
  let after = tiles.map(t => t.textContent);
  if (before.toString() !== after.toString()) {
    generate();
    updateScore();
    checkGameOver();
  }
}

function checkGameOver() {
  if (tiles.some(t => t.textContent === "")) return;
  for (let i = 0; i < 16; i++) {
    const val = tiles[i].textContent;
    const neighbors = [];
    if (i % 4 !== 3) neighbors.push(tiles[i + 1]);
    if (i % 4 !== 0) neighbors.push(tiles[i - 1]);
    if (i < 12) neighbors.push(tiles[i + 4]);
    if (i > 3) neighbors.push(tiles[i - 4]);
    if (neighbors.some(n => n.textContent === val)) return;
  }
  alert("بازی تمام شد!");
}

document.addEventListener("keydown", e => {
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
    move(e.key);
  }
});

newGameBtn.addEventListener("click", createGrid);

createGrid();
touch.clientX
touch.clientY

let touchStartX = 0;
let touchStartY = 0;

container.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

container.addEventListener("touchend", e => {
  const touch = e.changedTouches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 30) move("ArrowRight");
    else if (dx < -30) move("ArrowLeft");
  } else {
    if (dy > 30) move("ArrowDown");
    else if (dy < -30) move("ArrowUp");
  }
});
