// MainMap.tsx
import React from "react";

export const MainMapImage =
  "https://github.com/BartoszSeno/MmoZero/blob/master/src/asset/image/world/mapsizetest.png";

interface MainMapProps {
  bgPosition: any;
  imgW: number;
  imgH: number;
  children: React.ReactNode;
  refs: any;
}

const MainMap: React.FC<MainMapProps> = ({
  bgPosition,
  imgW,
  imgH,
  children,
  refs,
}) => {
  const GameMap: React.CSSProperties = {
    width: imgW + "px",
    height: imgH + "px",
    position: "relative",
    border: "1px solid black",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${MainMapImage})`,
    backgroundSize: "cover",
    backgroundPosition: bgPosition,
  };

  return (
    <div style={GameMap} ref={refs}>
      {children}
    </div>
  );
};

export default MainMap;
