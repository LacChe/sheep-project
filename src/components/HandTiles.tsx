import { IonButton, IonCard } from '@ionic/react';
import React from 'react';
import './HandTiles.css';

type HandTilesProps = {
  tilesInHand: string[];
  removeTileId: string;
  removeTileIndex: number;
  justAddedtile: boolean;
};

const HandTiles: React.FC<HandTilesProps> = ({
  tilesInHand,
  removeTileId,
  removeTileIndex,
  justAddedtile,
}) => {
  return (
    <IonCard className="hand-tiles-row">
      {tilesInHand.map((tileId, index) => (
        // transition opacity when adding or removing tile
        <IonButton
          style={{
            transition:
              removeTileId === tileId ||
              removeTileIndex === index ||
              (index === tilesInHand.length - 1 && justAddedtile)
                ? 'all 0.5s ease-in-out'
                : 'none',
            width:
              removeTileId === tileId || removeTileIndex === index
                ? '0px'
                : 'var(--tile-width)',
            opacity:
              removeTileId === tileId || removeTileIndex === index ? '0' : '1',
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
