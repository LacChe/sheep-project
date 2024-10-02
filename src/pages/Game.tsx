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

type GameProps = { loadSave: boolean };

const Game: React.FC<GameProps> = ({ loadSave = false }) => {
  const router = useIonRouter();
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
          <div className="tiles-board">tiles board</div>
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
