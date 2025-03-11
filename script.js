const container = document.querySelector("#container");
const gridSizeLabel = document.querySelector("#gridSizeLabel");
const slider = document.querySelector("#gridSizeSlider");
const blackBtn = document.querySelector("#blackBtn");
const colorBtn = document.querySelector("#colorBtn");
const resetBtn = document.querySelector("#resetBtn");

let currentMode = "black"; // Mode par défaut

// Fonction pour récupérer une couleur aléatoire
function getRandomRGBColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Gestion du mode (black ou rainbow)
blackBtn.addEventListener("click", () => (currentMode = "black"));
colorBtn.addEventListener("click", () => (currentMode = "rainbow"));

// Création de la grille optimisée
function createGrid(gridSize) {
  // Nettoyer le conteneur avant de recréer la grille
  container.innerHTML = ""; 

  // Créer la grille
  const grid = document.createElement("div");
  grid.setAttribute("id", "grid");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  grid.style.width = "400px";
  grid.style.height = "400px";
  grid.style.border = "2px solid black";

  // Ajouter les cases
  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.border = "1px solid #e3e3e3";
    grid.appendChild(square);
  }

  container.appendChild(grid);
}

// EventListener unique pour changer la couleur des cases
container.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("square")) {
    event.target.style.backgroundColor = currentMode === "black" ? "black" : getRandomRGBColor();
  }
});

// Debouncing : limite le nombre d'exécutions lors du déplacement du slider
let debounceTimer;
slider.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const gridSize = slider.value;
    gridSizeLabel.textContent = `${gridSize} x ${gridSize}`;
    createGrid(gridSize);
  }, 100); // Attente de 100ms avant d'exécuter createGrid()
});

// Bouton Reset
resetBtn.addEventListener("click", () => {
  document.querySelectorAll(".square").forEach(square => {
    square.style.backgroundColor = "";
  });
});

// Initialisation de la grille
createGrid(slider.value);
