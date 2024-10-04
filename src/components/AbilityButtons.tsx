import { IonButton, IonCard } from '@ionic/react';
import React, { Dispatch, SetStateAction } from 'react';
import './AbilityButtons.css';

type AbilityButtonsProps = {
  abilityUses: [0 | 1, 0 | 1, 0 | 1];
  setAbilityUses: Dispatch<SetStateAction<[0 | 1, 0 | 1, 0 | 1]>>;
};

const AbilityButtons: React.FC<AbilityButtonsProps> = ({
  abilityUses,
  setAbilityUses,
}) => {
  function handleAbilityClick(abilityIndex: number) {
    setAbilityUses((prev) => {
      let newAbilityUses: [0 | 1, 0 | 1, 0 | 1] = [...prev];
      newAbilityUses[abilityIndex] = 0;
      return newAbilityUses;
    });
  }

  return (
    <IonCard className="ability-buttons">
      <IonButton
        style={{ pointerEvents: abilityUses[0] == 0 ? 'none' : 'auto' }}
        className="ability-button"
        onClick={() => handleAbilityClick(0)}
      >
        Return3
      </IonButton>
      <IonButton
        style={{ pointerEvents: abilityUses[1] == 0 ? 'none' : 'auto' }}
        className="ability-button"
        onClick={() => handleAbilityClick(1)}
      >
        Randomize
      </IonButton>
      <IonButton
        style={{ pointerEvents: abilityUses[2] == 0 ? 'none' : 'auto' }}
        className="ability-button"
        onClick={() => handleAbilityClick(2)}
      >
        Undo
      </IonButton>
    </IonCard>
  );
};

export default AbilityButtons;
