import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import TilesBoard from '../components/TilesBoard';
import HandTiles from '../components/HandTiles';
import { generateTemplateLevel } from '../utils/levelGenerator';
import { Preferences } from '@capacitor/preferences';
import ConfettiExplosion from 'react-confetti-explosion';
import woohoo from '../assets/audio/woohoo.mp3';
import shimmer from '../assets/audio/shimmer.mp3';
import './Game.css';

type GameProps = { loadSave: boolean };

const Game: React.FC<GameProps> = ({ loadSave = true }) => {
  const router = useIonRouter();
  const [level, setlevel] = useState<number>(0);
  const [tilesInBoard, setTilesInBoard] = useState<string[][][]>([]);
  const [tilesInHand, setTilesInHand] = useState<string[]>([]);
  const [removeTileId, setRemoveTileId] = useState<string>('');
  const [justAddedtile, setJustAddedTile] = useState<boolean>(false);
  const [allowPointer, setAllowPointer] = useState<boolean>(true);
  const [initDone, setInitDone] = useState<boolean>(false);
  const [isLevelClearedAlertOpen, setIsLevelClearedAlertOpen] =
    useState<boolean>(false);

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    let loadSaveSuccess = true;
    if (loadSave) {
      // load save data
      const levelValue = (await Preferences.get({ key: 'level' }))?.value;
      if (levelValue) setlevel(await JSON.parse(levelValue));
      else loadSaveSuccess = false;
      // setTilesInBoard()
      const tilesInBoardValue = (await Preferences.get({ key: 'tilesInBoard' }))
        ?.value;
      if (tilesInBoardValue)
        setTilesInBoard(await JSON.parse(tilesInBoardValue));
      else loadSaveSuccess = false;
      // setTilesInHand()
      const tilesInHandValue = (await Preferences.get({ key: 'tilesInHand' }))
        ?.value;
      if (tilesInHandValue) setTilesInHand(await JSON.parse(tilesInHandValue));
      else loadSaveSuccess = false;
    }

    if (!loadSaveSuccess || !loadSave) {
      // new game
      setlevel(0);
      setTilesInHand([]);
      setTilesInBoard(generateTemplateLevel(0));
    }
    setInitDone(true);
  }

  function navigateToHome() {
    handleSave();
    router.goBack();
  }

  function handleSave() {
    Preferences.set({
      key: 'saveExists',
      value: JSON.stringify(true),
    });
    Preferences.set({
      key: 'level',
      value: JSON.stringify(level),
    });
    Preferences.set({
      key: 'tilesInBoard',
      value: JSON.stringify(tilesInBoard),
    });
    Preferences.set({
      key: 'tilesInHand',
      value: JSON.stringify(tilesInHand),
    });
  }

  useEffect(() => {
    if (initDone && checkLevelClear()) {
      let audio = document.getElementById('woohoo') as HTMLAudioElement;
      audio?.play();
      setIsLevelClearedAlertOpen(true);
    }
  }, [tilesInBoard]);

  function setNextLevel() {
    setTilesInBoard(generateTemplateLevel(level + 1));
    setlevel((prev) => prev + 1);
  }

  function checkLevelClear() {
    handleSave();
    for (let layerIndex = 0; layerIndex < tilesInBoard.length; layerIndex++) {
      for (
        let rowIndex = 0;
        rowIndex < tilesInBoard[layerIndex].length;
        rowIndex++
      ) {
        for (
          let tileIndex = 0;
          tileIndex < tilesInBoard[layerIndex][rowIndex].length;
          tileIndex++
        ) {
          if (tilesInBoard[layerIndex][rowIndex][tileIndex] !== '')
            return false;
        }
      }
    }
    return true;
  }

  useEffect(() => {
    setTimeout(() => {
      checkThreeOfTheSame();
    }, 200);
  }, [tilesInHand]);

  function checkThreeOfTheSame() {
    tilesInHand.forEach((tileId) => {
      if (tilesInHand.filter((t) => t === tileId).length === 3) {
        let audio = document.getElementById('shimmer') as HTMLAudioElement;
        audio?.play();
        removeTilesFromHand(tileId);
      }
    });
  }

  function addTileToHand(tile: string) {
    if (tilesInHand.length < 7) {
      setTilesInHand((prev) => [...prev, tile]);
      setJustAddedTile(true);
      setAllowPointer(false);
      setTimeout(() => {
        setJustAddedTile(false);
      }, 200);
      setTimeout(() => {
        setAllowPointer(true);
      }, 200);
    } else throw new Error("Can't add more than 7 tiles to a row");
  }

  function removeTilesFromHand(tileId: string) {
    // fade tiles out
    setRemoveTileId(tileId);
    setAllowPointer(false);
    // then remove
    setTimeout(() => {
      setTilesInHand((prev) => prev.filter((t) => t !== tileId));
      setRemoveTileId('');
      setAllowPointer(true);
    }, 200);
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
        <div
          className={`game-content${!allowPointer ? ' pointer-disabled' : ''}`}
        >
          <div>Level {level}</div>
          <TilesBoard
            tiles={tilesInBoard}
            setTiles={setTilesInBoard}
            addTileToHand={addTileToHand}
          />
          <HandTiles
            removeTileId={removeTileId}
            tilesInHand={tilesInHand}
            justAddedtile={justAddedtile}
          />
        </div>
        <IonAlert
          header="Level Cleared!"
          is-open={isLevelClearedAlertOpen}
          buttons={[
            {
              text: 'Continue',
              role: 'confirm',
              handler: () => {},
            },
          ]}
          onDidDismiss={() => {
            setIsLevelClearedAlertOpen(false);
            setNextLevel();
          }}
        ></IonAlert>
        <div className="confetti">
          {isLevelClearedAlertOpen && <ConfettiExplosion force={1} />}
        </div>
        <audio id="woohoo" src={woohoo}></audio>
        <audio id="shimmer" src={shimmer}></audio>
      </IonContent>
    </IonPage>
  );
};

export default Game;
