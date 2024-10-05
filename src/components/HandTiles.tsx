import { IonButton, IonCard, IonImg } from '@ionic/react';
import React from 'react';
import gifs from '../assets/gifs';
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
        <div
          style={{
            transition:
              removeTileId === tileId
                ? 'all 0.3s ease-in-out'
                : index === tilesInHand.length - 1
                ? 'opacity 0.2s ease-in-out'
                : 'none',
            width: removeTileId === tileId ? '0px' : 'var(--tile-width)',
            opacity:
              removeTileId !== tileId &&
              !(index === tilesInHand.length - 1 && justAddedtile)
                ? '1'
                : '0',
          }}
          className="tile"
          key={index}
        >
          <div className="padded-border">
            <IonImg src={gifs[parseInt(tileId)]} />
          </div>
        </div>
      ))}
    </IonCard>
  );
};

export default HandTiles;
