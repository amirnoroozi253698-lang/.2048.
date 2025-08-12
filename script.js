const container = document.getElementById("game-container");
const newGameBtn = document.getElementById("new-game");

function createGrid() {
  container.innerHTML = "";
  for (let i = 0; i < 16; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = Math.random() < 0.2 ? "2" : "";
    container.appendChild(tile);
  }
}

newGameBtn.addEventListener("click", createGrid);

createGrid();
