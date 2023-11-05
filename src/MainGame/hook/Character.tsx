// MainCharacter.tsx
import React from "react";

export const MainCharacterImageUrl =
  "https://raw.githubusercontent.com/BartoszSeno/ClickerZero/main/src/assets/MainImg/Characters/Joanna.gif";

interface MainCharacterProps {}

const MainCharacter: React.FC<MainCharacterProps> = () => {
  return <img src={MainCharacterImageUrl} alt="Main Character" />;
};

export default MainCharacter;
