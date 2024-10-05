import levelTemplates from './levelTemplates';

const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 6;

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

function totalTileAmount(levelArray: string[][][]) {
  let totalTiles = 0;
  for (let layerIndex = 0; layerIndex < levelArray.length; layerIndex++) {
    for (
      let rowIndex = 0;
      rowIndex < levelArray[layerIndex].length;
      rowIndex++
    ) {
      for (
        let tileIndex = 0;
        tileIndex < levelArray[layerIndex][rowIndex].length;
        tileIndex++
      ) {
        if (levelArray[layerIndex][rowIndex][tileIndex] !== ' ') totalTiles++;
      }
    }
  }
  if (totalTiles % 3 !== 0)
    console.error(totalTiles, '/', 3, '=', totalTiles / 3);
  return totalTiles;
}

export function generateTemplateLevel(level: number) {
  let tilesOnBoard: string[][][] = [];

  // generate list of shuffled tiles to be added to board
  const ALLOWED_TILE_IDS_AMOUNT = level + 3;
  let tilesToBeAdded: string[] = [];
  for (let i = 0; i < totalTileAmount(levelTemplates[level]); i += 3) {
    const RANDOM_INDEX = Math.trunc(Math.random() * ALLOWED_TILE_IDS_AMOUNT);
    tilesToBeAdded.push(
      VALID_TILE_IDS[RANDOM_INDEX],
      VALID_TILE_IDS[RANDOM_INDEX],
      VALID_TILE_IDS[RANDOM_INDEX],
    );
  }
  tilesToBeAdded = shuffle(tilesToBeAdded);

  for (
    let layerIndex = 0;
    layerIndex < levelTemplates[level].length;
    layerIndex++
  ) {
    let layer: string[][] = [];
    for (let rowIndex = 0; rowIndex < BOARD_HEIGHT; rowIndex++) {
      let row: string[] = [];
      for (let tileIndex = 0; tileIndex < BOARD_WIDTH; tileIndex++) {
        // push empty tiles for end edges of even layers or template cell is empty
        if (
          (layerIndex % 2 !== 0 &&
            (rowIndex === BOARD_HEIGHT - 1 || tileIndex === BOARD_WIDTH - 1)) ||
          levelTemplates[level][layerIndex][rowIndex][tileIndex] === ' '
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

export function generateBasicLevel(level: number) {
  let tilesOnBoard: string[][][] = [];

  // generate list of shuffled tiles to be added to board
  const ALLOWED_TILE_IDS_AMOUNT = level + 3;
  const TOTAL_TILE_AMOUNT =
    (level + 1) * BOARD_WIDTH * BOARD_HEIGHT -
    Math.trunc((level + 1) / 2) * (BOARD_WIDTH + BOARD_HEIGHT - 1);
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
    for (let rowIndex = 0; rowIndex < BOARD_HEIGHT; rowIndex++) {
      let row: string[] = [];
      for (let tileIndex = 0; tileIndex < BOARD_WIDTH; tileIndex++) {
        // push empty tiles for end edges of even layers
        if (
          layerIndex % 2 !== 0 &&
          (rowIndex === BOARD_HEIGHT - 1 || tileIndex === BOARD_WIDTH - 1)
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
