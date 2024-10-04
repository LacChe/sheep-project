import { IonButton, IonCard } from '@ionic/react';
import React from 'react';
import './HandTiles.css';

type HandTilesProps = {
  tilesInHand: string[];
  removeTileId: string;
  justAddedtile: boolean;
};

const HandTiles: React.FC<HandTilesProps> = ({
  tilesInHand,
  removeTileId,
  justAddedtile,
}) => {
  return (
    <IonCard className="hand-tiles-row">
      {tilesInHand.map((tileId, index) => (
        // transition opacity when being removed or being added as last tile
        <IonButton
          style={{
            transition:
              removeTileId !== tileId ||
              (index === tilesInHand.length - 1 && justAddedtile)
                ? 'none'
                : 'all 0.5s ease-in-out',
            width: removeTileId === tileId ? '0px' : 'var(--tile-width)',
            opacity:
              removeTileId === tileId ||
              (index === tilesInHand.length - 1 && justAddedtile)
                ? '0'
                : '1',
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
