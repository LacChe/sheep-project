import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  useIonRouter,
} from '@ionic/react';
import './Home.css';

type HomeProps = { setLoadSave: (loadSave: boolean) => void };

const Home: React.FC<HomeProps> = ({ setLoadSave }) => {
  const router = useIonRouter();

  function navigateToGame(loadSave: boolean) {
    setLoadSave(loadSave);
    router.push('/game', 'none');
  }

  return (
    <IonPage>
      <IonContent>
        <div className="home-content">
          <IonImg className="hero-icon" src="../../public/favicon.png" />
          <IonButton onClick={() => navigateToGame(true)}>Continue</IonButton>
          <IonButton onClick={() => navigateToGame(false)}>New Game</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
