import React, { Component } from "react";
import MainCharacter, { MainCharacterImageUrl } from "./Character";
import MainMap, { MainMapImage } from "./Map";

interface MovingDivState {
  imageWidth: number;
  imageHeight: number;
  imageWidthCharacter: number;
  imageHeightCharacter: number;
  backgroundPosition: any;
}

interface MovingDivProps {
  usernames: any[]; // Dostosuj typ danych do rzeczywistego formatu danych
  textValue: string;
  wallsN: any[];
}

class MovingDiv extends Component<MovingDivProps, MovingDivState> {
  interval: NodeJS.Timer | undefined;
  containerRef: React.RefObject<HTMLDivElement>;

  // fast accest to modivy the world
  //============================================
  MovmentSpeed = 100;

  //============================================
  constructor(props: MovingDivProps) {
    super(props);

    this.state = {
      imageWidth: 0,
      imageHeight: 0,
      imageWidthCharacter: 0,
      imageHeightCharacter: 0,
      backgroundPosition: "50% 50%", // Pozycja planszy w poziomie i pionie
    };

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    this.componentDidMountImage();
    this.componentDidMountImageCharacter();
  }

  componentDidMountImage() {
    const image = new Image();
    image.src = MainMapImage;
    image.onload = () => {
      const imageWidth = image.width;
      const imageHeight = image.height;
      this.setState({ imageWidth, imageHeight });
    };
  }

  componentDidMountImageCharacter() {
    const image = new Image();
    image.src = MainCharacterImageUrl;
    image.onload = () => {
      const imageWidthCharacter = image.width / 2;
      const imageHeightCharacter = image.height / 2;
      this.setState({ imageWidthCharacter, imageHeightCharacter });
    };
  }

  render() {
    const {
      imageWidth,
      imageHeight,
      imageWidthCharacter,
      imageHeightCharacter,
      backgroundPosition,
    } = this.state;

    const { usernames, textValue, wallsN } = this.props;
    return (
      <>
        <MainMap
          bgPosition={backgroundPosition}
          imgW={imageWidth}
          imgH={imageHeight}
          refs={this.containerRef}
        >
          {wallsN.map(
            (
              wall: { x: any; y: any; width: any; height: any },
              index: React.Key | null | undefined
            ) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: wall.x,
                  top: wall.y,
                  width: wall.width,
                  height: wall.height,
                  background: "gray", // Kolor ściany
                }}
              ></div>
            )
          )}
          {usernames.map((user) => (
            <div
              key={user.id}
              id={user.id}
              style={{
                color: user.id === textValue ? "red" : "black",
                position: "absolute",
                left: user.position ? `${user.position.x}px` : "0",
                top: user.position ? `${user.position.y}px` : "0",
                backgroundColor: "blue",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "end",
                justifyContent: "center",
                //transition: "0.05s",
              }}
            >
              <div
                style={{
                  width: `${imageWidthCharacter}px`,
                  height: `${imageHeightCharacter}px`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MainCharacter />
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "-170px",
                  }}
                >
                  {user.userName}
                </div>
              </div>
            </div>
          ))}
        </MainMap>
      </>
    );
  }
}

export default MovingDiv;
