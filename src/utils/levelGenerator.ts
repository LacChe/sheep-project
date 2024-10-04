const BOARD_SIZE = 6;

const VALID_TILE_IDS: string[] = ['a', 'b', 'c', 'd', 'e']; // TODO set to images
// TODO set level shape templates

// TODO limit types of tiles
// TODO make sure all tiles are multiples of three

export function generateTestLevel(level: number) {
  let tilesOnBoard: string[][][] = [];
  for (let layerIndex = 0; layerIndex < level + 1; layerIndex++) {
    let layer: string[][] = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      let row: string[] = [];
      row.push('A');
      row.push('B');
      row.push('C');
      row.push('A');
      row.push('B');
      row.push('C');
      layer.push(row);
    }
    tilesOnBoard.push(layer);
  }
  return tilesOnBoard;
}

export function generateBasicLevel(level: number) {
  let tilesOnBoard: string[][][] = [];
  for (let layerIndex = 0; layerIndex < level + 2; layerIndex++) {
    let layer: string[][] = [];
    for (let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++) {
      let row: string[] = [];
      for (let tileIndex = 0; tileIndex < BOARD_SIZE; tileIndex++) {
        const randomIndex: number = Math.floor(
          Math.random() * (VALID_TILE_IDS.length + 1),
        );
        if (
          layerIndex % 2 !== 0 &&
          (rowIndex === BOARD_SIZE - 1 || tileIndex === BOARD_SIZE - 1)
        )
          row.push('');
        else row.push(randomIndex === 0 ? '' : VALID_TILE_IDS[randomIndex - 1]);
      }
      layer.push(row);
    }
    tilesOnBoard.push(layer);
  }
  return tilesOnBoard;
}
