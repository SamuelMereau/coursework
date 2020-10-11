/* Written by Samuel Mereau, 2020 */

let gridSize = 16;

let colour = '#000000';

function createGrid() {
  if (gridSize > 100) {
    gridSize = 16;
    alert(
      'The provided size is too large. To prevent the page slowing down, please pick a number below 100.'
    );
  }
  const gridDiv = document.querySelector('#grid');
  gridDiv.style.gridTemplateColumns = `repeat(${gridSize}, ${545 / gridSize}px)`;
  gridDiv.style.gridTemplateRows = `repeat(${gridSize}, ${545 / gridSize}px)`;

  for (let i = 0; i < Math.pow(gridSize, 2); i++) {
    //Style Grid Content
    const newGridItem = document.createElement('div');
    newGridItem.setAttribute('class', `gridItem`);
    newGridItem.setAttribute('id', `gridItem${i}`);
    gridDiv.appendChild(newGridItem);
  }
  draw();
}

function draw() {
  let gridItems = document.querySelectorAll('.gridItem');
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener('mouseover', function (e) {
      gridItems[i].style.backgroundColor = `${colour}`;
    });
  }
}

function awaitClear() {
  const clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', function () {
    let size = prompt('Enter a size for the canvas');
    if (size === '') {
      return;
    } else if (size !== null) {
      const gridItems = document.getElementsByClassName('gridItem');
      while (gridItems[0]) {
        gridItems[0].parentNode.removeChild(gridItems[0]);
      }
      gridSize = size;
      createGrid();
    } else {
      return;
    }
  });
}

function watchColourChange() {
  const colourButton = document.querySelector('#colour');
  colourButton.addEventListener('change', function (e) {
    colour = e.target.value;
  });
}

createGrid();

awaitClear();

watchColourChange();
