import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './Game.css';
import TilesBoard from '../components/TilesBoard';
import HandTiles from '../components/HandTiles';
import { generateBasicLevel } from '../utils/levelGenerator';

type GameProps = { loadSave: boolean };

const Game: React.FC<GameProps> = ({ loadSave = false }) => {
  const tempAbilityButtons = [0, 1, 2];

  const router = useIonRouter();
  const [level, setlevel] = useState<number>(0);
  const [tilesInBoard, setTilesOnBoard] = useState<string[][][]>([]);
  const [tilesInHand, setTilesInHand] = useState<string[]>([]);
  const [removeTileId, setRemoveTileId] = useState<string>('');

  useEffect(() => {
    if (loadSave) {
      // load save data
      // setlevel()
      // setTilesInHand()
      // setTilesOnBoard()
    } else {
      // new game and save new data
      setlevel(0);
      setTilesInHand([]);
      setTilesOnBoard(generateBasicLevel(0));
      /* save */
    }
  }, []);

  function navigateToHome() {
    /* save */
    router.goBack();
  }

  useEffect(() => {
    /* save */
    setTimeout(() => {
      checkThreeOfTheSame();
    }, 500);
  }, [tilesInHand]);

  function checkThreeOfTheSame() {
    tilesInHand.forEach((tileId) => {
      if (tilesInHand.filter((t) => t === tileId).length === 3) {
        removeTilesFromHand(tileId);
      }
    });
  }

  function addTileToHand(tile: string) {
    if (tilesInHand.length < 7) {
      setTilesInHand((prev) => [...prev, tile]);
    } else throw new Error("Can't add more than 7 tiles to a row");
  }

  function removeTilesFromHand(tileId: string) {
    setRemoveTileId(tileId);
    setTimeout(() => {
      setTilesInHand((prev) => prev.filter((t) => t !== tileId));
      setRemoveTileId('');
    }, 500);
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="translucent">
          <IonButtons className="ion-padding" slot="end">
            <IonButton onClick={() => navigateToHome()}>Back</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="game-content">
          <div>Level {level}</div>
          <TilesBoard
            tiles={tilesInBoard}
            setTiles={setTilesOnBoard}
            addTileToHand={addTileToHand}
          />
          <HandTiles removeTileId={removeTileId} tilesInHand={tilesInHand} />
          <div className="abilities">
            {tempAbilityButtons.map((tile) => (
              <div className="ability-button" key={tile}>
                {tile}
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Game;
