import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import React from 'react';
import './Game.css';
import TilesBoard from '../components/TilesBoard';

type GameProps = { loadSave: boolean };

const Game: React.FC<GameProps> = ({ loadSave = false }) => {
  const router = useIonRouter();
  const tempTilesInBoard = [
    [
      ['11a', '11b', '11c', '11d', '11e', '11f', '11g'],
      ['12a', '12b', '12c', '12d', '12e', '12f', '12g'],
      ['13a', '13b', '13c', '13d', '13e', '13f', '13g'],
      ['14a', '14b', '14c', '14d', '14e', '14f', '14g'],
      ['15a', '15b', '15c', '15d', '15e', '15f', '15g'],
      ['16a', '16b', '16c', '16d', '16e', '16f', '16g'],
    ],
    [
      ['21a', '21b', '21c', '21d', '21e', '21f', ''],
      ['22a', '', '', '', '', '22f', ''],
      ['23a', '', '', '', '', '23f', ''],
      ['24a', '', '', '', '', '24f', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ],
    [
      ['41a', '', '41c', '', '41e', '', ''],
      ['42a', '', '42c', '', '42e', '', ''],
      ['43a', '', '43c', '', '43e', '', ''],
      ['44a', '', '44c', '', '44e', '', ''],
      ['45a', '', '45c', '', '45e', '', ''],
      ['', '', '', '', '', '', ''],
    ],
  ];
  const tempTilesInRow = [0, 1, 2, 3, 4, 5, 6];
  const tempAbilityButtons = [0, 1, 2];

  console.log(loadSave);

  function navigateToHome() {
    router.push('/home', 'none');
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
          <div>Level #</div>
          <TilesBoard tiles={tempTilesInBoard} />
          <div className="tile-row">
            {tempTilesInRow.map((tile) => (
              <div className="tile" key={tile}>
                {tile}
              </div>
            ))}
          </div>
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
