let gridSize = 10;

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const makeBlackColor = (cell) => {
  let [r, g, b] = cell.dataset.color.split(", ");
  if (r === "0" && g === "0" && b === "0") {
    return;
  }
  r = Math.max(0, parseInt(r) - 25.5);
  g = Math.max(0, parseInt(g) - 25.5);
  b = Math.max(0, parseInt(b) - 25.5);
  const color = `rgb(${r}, ${g}, ${b})`;
  cell.style.backgroundColor = color;
  cell.dataset.color = `${r}, ${g}, ${b}`;
};

const generateGrid = (getColor, gridSize) => {
  const gridContainer = document.querySelector("#grid");
  gridContainer.innerHTML = "";

  const containerWidth = gridContainer.offsetWidth;
  const cellSize = `${containerWidth / gridSize}px`;

  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    gridContainer.appendChild(row);
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.width = cellSize;
      cell.style.height = cellSize;
      cell.style.backgroundColor = "white";
      cell.dataset.color = "255, 255, 255";
      cell.addEventListener("mouseover", () => {
        cell.style.backgroundColor = getColor(cell);
      });
      row.appendChild(cell);
    }
  }
};

const newGridBtn = document.querySelector(".new-grid");
newGridBtn.addEventListener("click", () => {
  gridSize = prompt("한 변에 포함될 사각형의 수를 입력하십시오 (최대 100)");
  if (gridSize !== null && gridSize > 0 && gridSize <= 100) {
    generateGrid(makeBlackColor, gridSize);
  }
});

const rainbowBtn = document.querySelector(".rainbow");
rainbowBtn.addEventListener("click", () => {
  generateGrid(getRandomColor, gridSize);
});

const blackBtn = document.querySelector(".black");
blackBtn.addEventListener("click", () => {
  generateGrid(makeBlackColor, gridSize);
});

generateGrid(makeBlackColor, 10);
