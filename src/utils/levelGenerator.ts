const BOARD_SIZE = 6;

const VALID_TILE_IDS: string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]; // TODO set to images
// TODO set level shape templates

export function generateBasicLevel(level: number) {
  let tilesOnBoard: string[][][] = [];

  // generate list of shuffled tiles to be added to board
  const ALLOWED_TILE_IDS_AMOUNT = level + 3;
  const TOTAL_TILE_AMOUNT =
    (level + 1) * BOARD_SIZE * BOARD_SIZE -
    Math.trunc((level + 1) / 2) * (BOARD_SIZE * 2 - 1);
  let tilesToBeAdded: string[] = [];
  for (let i = 0; i < TOTAL_TILE_AMOUNT; i++) {
    const RANDOM_INDEX = Math.trunc(Math.random() * ALLOWED_TILE_IDS_AMOUNT);
    const BLANK_TILE = Math.random() < 0.3;
    if (i + 3 < TOTAL_TILE_AMOUNT && !BLANK_TILE) {
      tilesToBeAdded.push(
        VALID_TILE_IDS[RANDOM_INDEX],
        VALID_TILE_IDS[RANDOM_INDEX],
        VALID_TILE_IDS[RANDOM_INDEX],
      );
      i += 2;
    } else {
      tilesToBeAdded.push('');
    }
  }
  tilesToBeAdded = shuffle(tilesToBeAdded);

  for (let layerIndex = 0; layerIndex < level + 1; layerIndex++) {
    let layer: string[][] = [];
    for (let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++) {
      let row: string[] = [];
      for (let tileIndex = 0; tileIndex < BOARD_SIZE; tileIndex++) {
        // push empty tiles for end edges of even layers
        if (
          layerIndex % 2 !== 0 &&
          (rowIndex === BOARD_SIZE - 1 || tileIndex === BOARD_SIZE - 1)
        )
          row.push('');
        else {
          row.push(tilesToBeAdded.shift() as string);
        }
      }
      layer.push(row);
    }
    tilesOnBoard.push(layer);
  }
  return tilesOnBoard;
}

function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
