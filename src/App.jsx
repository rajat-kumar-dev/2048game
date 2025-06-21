import { useState, useEffect } from 'react';
import './App.css';
const GRID_SIZE = 4;

function App() {
  const [grid, setGrid] = useState(getInitialGrid(GRID_SIZE));
  const [moveCount, setMoveCount] = useState(0);
  const [spawnCells, setSpawnCells] = useState([]);

  function moveUp() {
    setGrid((prevGrid) => {
      let moveSucess = false;
      let gridCopy = JSON.parse(JSON.stringify(prevGrid));
      for (let i = 0; i < gridCopy.length; i++) {
        //merge
        let lastValueIndex = -1;
        let lastValue = null;
        for (let j = 0; j < gridCopy.length; j++) {
          let cell = gridCopy[j][i];
          if (!cell.isEmpty) {
            if (lastValue) {
              if (lastValue === cell.value) {
                const newCell = getCellByLevel(cell.level + 1);
                gridCopy[lastValueIndex][i] = newCell;
                gridCopy[j][i] = getCellByLevel();
                lastValue = newCell.value;
              } else {
                lastValue = cell.value;
                lastValueIndex = j;
              }
            } else {
              lastValue = cell.value;
              lastValueIndex = j;
            }
          }
        }

        //shift
        let lastEmptyIndex = -1;
        for (let j = 0; j < gridCopy.length; j++) {
          let cell = gridCopy[j][i];
          if (cell.isEmpty && lastEmptyIndex === -1) {
            lastEmptyIndex = j;
          }
          if (!cell.isEmpty && lastEmptyIndex !== -1) {
            gridCopy[lastEmptyIndex][i] = cell;
            gridCopy[j][i] = getCellByLevel();
            lastEmptyIndex++;
            moveSucess = true;
          }
        }
      }
      if (moveSucess) setMoveCount((prev) => prev + 1);
      return gridCopy;
    });
  }

  function moveDown() {
    setGrid((prevGrid) => {
      let moveSucess = false;
      let gridCopy = JSON.parse(JSON.stringify(prevGrid));
      for (let i = 0; i < gridCopy.length; i++) {
        //merge
        let lastValueIndex = -1;
        let lastValue = null;
        for (let j = gridCopy.length - 1; j >= 0; j--) {
          let cell = gridCopy[j][i];
          if (!cell.isEmpty) {
            if (lastValue) {
              if (lastValue === cell.value) {
                const newCell = getCellByLevel(cell.level + 1);
                gridCopy[lastValueIndex][i] = newCell;
                gridCopy[j][i] = getCellByLevel();
                lastValue = newCell.value;
              } else {
                lastValue = cell.value;
                lastValueIndex = j;
              }
            } else {
              lastValue = cell.value;
              lastValueIndex = j;
            }
          }
        }

        //shift
        let lastEmptyIndex = -1;
        for (let j = gridCopy.length - 1; j >= 0; j--) {
          let cell = gridCopy[j][i];
          if (cell.isEmpty && lastEmptyIndex === -1) {
            lastEmptyIndex = j;
          }
          if (!cell.isEmpty && lastEmptyIndex !== -1) {
            gridCopy[lastEmptyIndex][i] = cell;
            gridCopy[j][i] = getCellByLevel();
            lastEmptyIndex--;
            moveSucess = true;
          }
        }
      }
      if (moveSucess) setMoveCount((prev) => prev + 1);
      return gridCopy;
    });
  }

  function moveLeft() {
    setGrid((prevGrid) => {
      let moveSucess = false;
      let gridCopy = JSON.parse(JSON.stringify(prevGrid));
      for (let i = 0; i < gridCopy.length; i++) {
        let row = gridCopy[i];
        let lastValueIndex = -1;
        let lastValue = null;
        //merge
        for (let j = 0; j < row.length; j++) {
          let cell = row[j];
          if (!cell.isEmpty) {
            if (lastValue) {
              if (lastValue === cell.value) {
                const newCell = getCellByLevel(cell.level + 1);
                row[lastValueIndex] = newCell;
                row[j] = getCellByLevel();
                lastValue = newCell.value;
              } else {
                lastValue = cell.value;
                lastValueIndex = j;
              }
            } else {
              lastValue = cell.value;
              lastValueIndex = j;
            }
          }
        }
        //shift
        let lastEmptyIndex = -1;
        for (let j = 0; j < row.length; j++) {
          let cell = row[j];
          if (cell.isEmpty && lastEmptyIndex === -1) {
            lastEmptyIndex = j;
          }
          if (!cell.isEmpty && lastEmptyIndex !== -1) {
            row[lastEmptyIndex] = cell;
            row[j] = getCellByLevel();
            lastEmptyIndex++;
            moveSucess = true;
          }
        }
      }
      if (moveSucess) setMoveCount((prev) => prev + 1);
      return gridCopy;
    });
  }

  function moveRight() {
    setGrid((prevGrid) => {
      let moveSucess = false;
      const gridCopy = JSON.parse(JSON.stringify(prevGrid));
      for (let i = 0; i < gridCopy.length; i++) {
        const row = gridCopy[i];
        let lastValueIndex = -1;
        let lastValue = null;
        //merge
        for (let j = row.length - 1; j >= 0; j--) {
          let cell = row[j];
          if (!cell.isEmpty) {
            if (lastValue) {
              if (lastValue === cell.value) {
                const newCell = getCellByLevel(cell.level + 1);
                row[lastValueIndex] = newCell;
                row[j] = getCellByLevel();
                lastValue = newCell.value;
              } else {
                lastValue = cell.value;
                lastValueIndex = j;
              }
            } else {
              lastValue = cell.value;
              lastValueIndex = j;
            }
          }
        }
        //shift
        let lastEmptyIndex = -1;
        for (let j = row.length - 1; j >= 0; j--) {
          const cell = row[j];
          if (cell.isEmpty && lastEmptyIndex === -1) {
            lastEmptyIndex = j;
          }
          if (!cell.isEmpty && lastEmptyIndex !== -1) {
            row[lastEmptyIndex] = cell;
            row[j] = getCellByLevel();
            lastEmptyIndex--;
            moveSucess = true;
          }
        }
      }
      if (moveSucess) setMoveCount((prev) => prev + 1);
      return gridCopy;
    });
  }

  function spawnNewCell(grid) {
    const { success, cord } = getEmptyCell(grid);
    if (!success) return;
    const [x, y] = cord;
    const gridCopy = JSON.parse(JSON.stringify(grid));
    const cell = getCellByLevel(1);
    gridCopy[x][y] = cell;
    setSpawnCells([cell.id]);
    setGrid(gridCopy);
  }

  const handleArrowPress = (e) => {
    switch (e.code) {
      case 'ArrowDown':
        moveDown();
        break;
      case 'ArrowUp':
        moveUp();
        break;
      case 'ArrowLeft':
        moveLeft();
        break;
      case 'ArrowRight':
        moveRight();
        break;
      default:
        break;
    }
  };

  function isSpwanCell(id) {
    return spawnCells.includes(id);
  }
  useEffect(() => {
    document.addEventListener('keydown', handleArrowPress);
    return () => {
      document.removeEventListener('keydown', handleArrowPress);
    };
  }, []);

  useEffect(() => {
    if (moveCount) {
      spawnNewCell(grid);
    }
  }, [moveCount]);

  useEffect(() => {
    const [cord1, cord2] = getInitialTwoEmptyCells(GRID_SIZE);
    const cell1 = getCellByLevel(1);
    const cell2 = getCellByLevel(1);
    grid[cord1.x][cord1.y] = cell1;
    grid[cord2.x][cord2.y] = cell2;
    setSpawnCells([cell1.id, cell2.id]);
  }, []);
  console.log(moveCount);

  return (
    <div>
      <div className="container">
        {grid.map((row, i) =>
          row.map((cell, k) => (
            <div key={`${i}${k}`} className="grid-child">
              <div
                className={`cell ${isSpwanCell(cell.id) ? 'spawnCell' : ''}`}
                style={{ backgroundColor: cell.color }}
              >
                {cell.isEmpty ? '' : cell.value}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function getEmptyCell(grid) {
  // const arr = grid.flat(1).reduce((acc, v, i) => {
  //   if (v.isEmpty) acc.push(i);
  //   return acc;
  // }, []);
  const arr = [];
  let index = -1;
  grid.map((row) =>
    row.map((cell) => {
      index++;
      if (cell.isEmpty) arr.push(index);
    })
  );
  const randomI = (Math.random() * arr.length) | 0;
  const position = arr[randomI];
  const [x, y] = [(position / 4) | 0, position % 4];
  return {
    success: position === undefined ? false : true,
    cord: [x, y],
  };
}
function getInitialTwoEmptyCells(size) {
  const arr = Array.from({ length: size * size }, (_, i) => i);
  const i = (Math.random() * arr.length) | 0;
  const position1 = arr[i];
  arr.splice(i, 1);
  const j = (Math.random() * arr.length) | 0;
  const position2 = arr[j];
  const [x1, y1, x2, y2] = [(position1 / 4) | 0, position1 % 4, (position2 / 4) | 0, position2 % 4];
  return [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
  ];
}
const colorLavel = [
  '#d6cdc4',
  '#eee4da',
  '#ede0c8',
  '#f2b179',
  '#f59563',
  '#f67c5f',
  '#f65e3b',
  '#edcf72',
  '#edcc61',
];

function getCellByLevel(level = 0) {
  const cell = {
    id: getNewId(),
    level: level,
    value: Math.pow(2, level),
    color: colorLavel[level],
    isEmpty: level > 0 ? false : true,
  };
  return cell;
}
function getInitialGrid(size) {
  const grid = Array.from({ length: size }, () => Array.from({ length: size }, getCellByLevel));
  return grid;
}
let tempIdd = 1;
function getNewId() {
  return tempIdd++;
}
export default App;
