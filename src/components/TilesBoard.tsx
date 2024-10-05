import { IonButton, IonCard } from '@ionic/react';
import React, { Dispatch, SetStateAction } from 'react';
import pop1 from '../assets/audio/pop1.mp3';
import pop2 from '../assets/audio/pop2.mp3';
import pop3 from '../assets/audio/pop3.mp3';

import './TilesBoard.css';

type TileBoardProps = {
  tiles: string[][][];
  addTileToHand: (tile: string) => void;
  setTiles: Dispatch<SetStateAction<string[][][]>>;
};

const TilesBoard: React.FC<TileBoardProps> = ({
  tiles,
  addTileToHand,
  setTiles,
}) => {
  const tileWidthCSS = getComputedStyle(document.body).getPropertyValue(
    '--tile-width',
  );
  const tileHeightCSS = getComputedStyle(document.body).getPropertyValue(
    '--tile-height',
  );
  const tileMaxWidthCSS = getComputedStyle(document.body).getPropertyValue(
    '--tile-max-width',
  );
  const tileMaxHeightCSS = getComputedStyle(document.body).getPropertyValue(
    '--tile-max-height',
  );

  function playAudio() {
    let audio = document.getElementById(
      `pop${Math.trunc(Math.random() * 3) + 1}`,
    ) as HTMLAudioElement;
    audio?.play();
  }

  function handleTileClick(
    layerIndex: number,
    rowIndex: number,
    tileIndex: number,
    tile: string,
  ) {
    playAudio();
    try {
      addTileToHand(tile);
      // fade tile out
      const tileElem = document.querySelectorAll(
        `#tile-${layerIndex}-${rowIndex}-${tileIndex}`,
      )[0] as HTMLElement;
      tileElem.style.opacity = '0';
      tileElem.style.transition = 'all 0.2s ease-in-out';
      // then remove
      setTimeout(() => {
        setTiles((prev) => {
          let newTiles = [...prev];
          newTiles[layerIndex][rowIndex][tileIndex] = '';
          return newTiles;
        });
        tileElem.style.opacity = '1';
        tileElem.style.transition = 'none 0.2s ease-in-out';
      }, 200);
    } catch (err) {
      console.log(err);
    }
  }

  function isClickable(
    layerIndex: number,
    rowIndex: number,
    tileIndex: number,
  ) {
    // check that there are no covering tiles on any layer above
    for (
      let checkingLayerIndex = layerIndex + 1;
      checkingLayerIndex < tiles.length;
      checkingLayerIndex++
    ) {
      if (layerIndex % 2 === checkingLayerIndex % 2) {
        // for every row of same even-ess check same tile
        if (tiles[checkingLayerIndex][rowIndex][tileIndex] !== '') return false;
      }
      // for every row of different even-ess check same tile and offsets
      if (layerIndex % 2 !== checkingLayerIndex % 2) {
        let offset = layerIndex % 2 !== 0 ? 1 : -1; // either shift back or forwards
        if (
          tiles[checkingLayerIndex][rowIndex][tileIndex] !== undefined &&
          tiles[checkingLayerIndex][rowIndex][tileIndex] !== ''
        )
          return false;
        if (
          tiles[checkingLayerIndex][rowIndex + offset]?.[tileIndex] !==
            undefined &&
          tiles[checkingLayerIndex][rowIndex + offset]?.[tileIndex] !== ''
        )
          return false;
        if (
          tiles[checkingLayerIndex][rowIndex][tileIndex + offset] !==
            undefined &&
          tiles[checkingLayerIndex][rowIndex][tileIndex + offset] !== ''
        )
          return false;
        if (
          tiles[checkingLayerIndex][rowIndex + offset]?.[tileIndex + offset] !==
            undefined &&
          tiles[checkingLayerIndex][rowIndex + offset]?.[tileIndex + offset] !==
            ''
        )
          return false;
      }
    }
    return true;
  }

  function tileDisplay(
    layerIndex: number,
    rowIndex: number,
    tileIndex: number,
    tile: string,
  ) {
    const clickable: boolean = isClickable(layerIndex, rowIndex, tileIndex);
    return (
      <IonButton
        className="tile"
        style={{
          visibility: `${tile === '' ? 'hidden' : 'visible'}`,
          pointerEvents: `${clickable ? 'auto' : 'none'}`,
          borderRadius: '5px',
          // tiles get darker the further down they are
          filter: `brightness(${
            100 +
            (tiles.length / 2) * 10 -
            (tiles.length - (layerIndex + 1)) * (60 / tiles.length)
          }%)`,
        }}
        onClick={() => handleTileClick(layerIndex, rowIndex, tileIndex, tile)}
        key={`tile-${layerIndex}-${rowIndex}-${tileIndex}`}
        id={`tile-${layerIndex}-${rowIndex}-${tileIndex}`}
      >
        {tile}
      </IonButton>
    );
  }

  return (
    <IonCard className="tiles-board">
      {tiles.map((layer, layerIndex) => (
        // LAYER
        <div
          key={layerIndex}
          style={{
            transform: `translate(${
              // shift every other row offset x by half tile
              layerIndex % 2 === 0
                ? '0'
                : `min(calc(${tileWidthCSS}*0.5), calc(${tileMaxWidthCSS}*0.5))`
            }, calc(${-100 * layerIndex}%))`,
            pointerEvents: 'none',
          }}
        >
          {layer.map((row, rowIndex) => (
            // ROW
            <div
              style={{
                transform: `translate(0, ${
                  // shift every other row offset y by half tile
                  layerIndex % 2 === 0
                    ? '0'
                    : `min(calc(${tileHeightCSS}*0.5), calc(${tileMaxHeightCSS}*0.5))`
                })`,
                pointerEvents: 'none',
              }}
              key={`row-${layerIndex}-${rowIndex}`}
              className="tiles-board-row ion-justify-content-center"
            >
              {row.map((tile, tileIndex) =>
                // TILE
                tileDisplay(layerIndex, rowIndex, tileIndex, tile),
              )}
            </div>
            // END ROW
          ))}
        </div>
        // END LAYER
      ))}
      <audio id="pop1" src={pop1}></audio>
      <audio id="pop2" src={pop2}></audio>
      <audio id="pop3" src={pop3}></audio>
    </IonCard>
  );
};

export default TilesBoard;
