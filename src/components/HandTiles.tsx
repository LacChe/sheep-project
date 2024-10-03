import { IonButton, IonCard } from '@ionic/react';
import React, { useState } from 'react';
import './HandTiles.css';

type HandTilesProps = {};

const HandTiles: React.FC<HandTilesProps> = () => {
  const [removeTileId, setRemoveTileId] = useState('');
  const [tempTilesInRow, setTempTilesInRow] = useState([
    '89',
    '90',
    '90',
    '93',
    '94',
    '95',
    '96',
  ]);

  function removeTilesFromHand(tile: string) {
    setRemoveTileId(tile);
    setTimeout(() => {
      setTempTilesInRow((prev) => prev.filter((t) => t !== tile));
      setRemoveTileId('');
    }, 500);
  }

  return (
    <IonCard className="hand-tiles-row">
      {tempTilesInRow.map((tile, index) => (
        <IonButton
          style={{
            transition: removeTileId !== tile ? 'none' : 'all 0.5s ease-in-out',
            width: removeTileId === tile ? '0px' : 'var(--tile-width)',
            opacity: removeTileId === tile ? '0' : '1',
          }}
          onClick={() => {
            removeTilesFromHand(tile);
          }}
          className="tile"
          key={index}
        >
          {tile}
        </IonButton>
      ))}
    </IonCard>
  );
};

export default HandTiles;
