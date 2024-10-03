import { IonButton, IonCard } from '@ionic/react';
import React from 'react';
import './HandTiles.css';

type HandTilesProps = { tilesInHand: string[]; removeTileId: string };

export function addTile() {}

const HandTiles: React.FC<HandTilesProps> = ({ tilesInHand, removeTileId }) => {
  return (
    <IonCard className="hand-tiles-row">
      {tilesInHand.map((tileId, index) => (
        <IonButton
          style={{
            transition:
              removeTileId !== tileId ? 'none' : 'all 0.5s ease-in-out',
            width: removeTileId === tileId ? '0px' : 'var(--tile-width)',
            opacity: removeTileId === tileId ? '0' : '1',
          }}
          className="tile"
          key={index}
        >
          {tileId}
        </IonButton>
      ))}
    </IonCard>
  );
};

export default HandTiles;
