import {
  IonButton,
  IonContent,
  IonImg,
  IonPage,
  useIonRouter,
  useIonViewDidEnter,
} from '@ionic/react';
import { useState } from 'react';
import { Preferences } from '@capacitor/preferences';
import gifs from '../assets/gifs';
import './Home.css';

type HomeProps = { setLoadSave: (loadSave: boolean) => void };

const Home: React.FC<HomeProps> = ({ setLoadSave }) => {
  const router = useIonRouter();

  const [saveExists, setSaveExists] = useState<boolean>(false);

  useIonViewDidEnter(() => {
    checkHasSaveData();
  });

  async function checkHasSaveData() {
    const { value } = await Preferences.get({ key: 'saveExists' });
    if (value) setSaveExists(await JSON.parse(value));
  }

  function navigateToGame(loadSave: boolean) {
    setLoadSave(loadSave);
    router.push('/game', 'none');
  }

  return (
    <IonPage>
      <IonContent>
        <div className="home-content">
          <IonImg className="hero-icon" src={gifs[1]} />
          {saveExists && (
            <IonButton onClick={() => navigateToGame(true)}>Continue</IonButton>
          )}
          <IonButton onClick={() => navigateToGame(false)}>New Game</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
