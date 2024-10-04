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
        // transition opacity when adding or removing tile
        <IonButton
          style={{
            transition:
              removeTileId === tileId ||
              (index === tilesInHand.length - 1 && justAddedtile)
                ? 'all 0.2s ease-in-out'
                : 'none',
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
