const container = document.querySelector("#container");

const grid = document.createElement("div");
grid.setAttribute("id", "grid");
container.appendChild(grid);

for (let i = 0; i < 256; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", () => {
    square.style.backgroundColor = "gray";
  });

  grid.appendChild(square);
}

const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  let number;
  do {
    number = prompt("Enter a number of squares per side (1-100)");
    if (number === null) return; // Permet à l'utilisateur d'annuler sans erreur
    number = parseInt(number.trim(), 10);
  } while (isNaN(number) || number < 1 || number > 100);

  const oldGrid = document.getElementById("newgrid");
  if (oldGrid) oldGrid.remove();

  grid.style.display = 'none';


  const newGrid = document.createElement("div");
  newGrid.setAttribute("id", "newgrid");
  container.appendChild(newGrid);

  newGrid.style.display = "grid";
  newGrid.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
  newGrid.style.gridTemplateRows = `repeat(${number}, 1fr)`;
  newGrid.style.width = "400px"; // Assure un cadre fixe
  newGrid.style.height = "400px";

  // 🔄 Génère les cases dynamiquement
  for (let i = 0; i < number * number; i++) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("newsquare");

    // ⚡ Ajuste la taille des cases pour qu'elles soient carrées
    newSquare.style.width = `${400 / number}px`;
    newSquare.style.height = `${400 / number}px`;
    newSquare.style.border = "1px solid gray";

    // 🎨 Effet de survol
    newSquare.addEventListener("mouseover", () => {
      newSquare.style.backgroundColor = "gray";
    });

    newGrid.appendChild(newSquare);
  }
});
