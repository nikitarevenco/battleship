import { onDragStart, onDragEnd } from "./drag-manager";

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
function createDomShips({ shipsArray, parent, lay, playerOne, playerTwo }) {
  const shuffledShipsArray = shuffle(shipsArray);
  shuffledShipsArray.forEach((ship) => {
    const domShip = document.createElement("div");
    domShip.classList.add("ship");
    domShip.classList.add(`ship-${ship}`);
    if (lay) {
      domShip.classList.add("lay");
    }
    domShip.setAttribute("draggable", "true");
    domShip.addEventListener("dragstart", (event) => {
      onDragStart({ event, playerOne, playerTwo });
    });
    domShip.addEventListener("dragend", (event) => {
      onDragEnd({ event, playerOne, playerTwo });
    });
    parent.append(domShip);
  });
}

function rotateAllShips() {
  document.querySelectorAll(".ship").forEach((ship) => {
    ship.classList.toggle("lay");
  });
  document.getElementById("ships").classList.toggle("lay");
}

function clearDomShips({ parent }) {
  const domShips = [...parent.querySelectorAll(".ship")];
  domShips.forEach((domShip) => {
    parent.removeChild(domShip);
  });
}

function updateDomShips({ shipsArray, parent, playerOne, playerTwo }) {
  const rotateButton = document.getElementById("rotate");
  rotateButton.addEventListener("click", rotateAllShips);
  const lay = document.querySelector("#ships").className.includes("lay");
  clearDomShips({ parent });
  createDomShips({ shipsArray, parent, lay, playerOne, playerTwo });
}

export default updateDomShips;
