import React, { Component } from "react";
import Wall from "./Wall";
import MainCharacter, { MainCharacterImageUrl } from "./Character";
import MainMap, { MainMapImage } from "./Map";

interface WallData {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface MovingDivState {
  top: number;
  left: number;
  keysPressed: Set<string>;
  walls: WallData[];
  imageWidth: number;
  imageHeight: number;
  imageWidthCharacter: number;
  imageHeightCharacter: number;
  backgroundPosition: any;
}

interface MovingDivProps {
  usernames: any[]; // Dostosuj typ danych do rzeczywistego formatu danych
  textValue: string;
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
      top: window.innerHeight / 2 - 25,
      left: window.innerWidth / 2 - 25,
      keysPressed: new Set<string>(),
      walls: [
        { left: 0, top: 15, width: 2800, height: 100 },
        { left: 0, top: 100, width: 740, height: 100 },
        { left: 2620, top: -190, width: 12000, height: 400 },
        { left: 1385, top: 110, width: 700, height: 100 },
        { left: 0, top: 200, width: 260, height: 100 },
        { left: 1570, top: 200, width: 420, height: 100 },
        { left: 2720, top: 210, width: 1650, height: 100 },
        { left: 5100, top: 200, width: 1000, height: 100 },
        { left: 6930, top: 200, width: 3940, height: 100 },
        { left: 12000, top: 200, width: 2500, height: 100 },
        { left: 0, top: 300, width: 160, height: 100 },
        { left: 1570, top: 300, width: 330, height: 100 },
        { left: 3300, top: 300, width: 690, height: 100 },
        { left: 3485, top: 400, width: 400, height: 100 },
        { left: 5783, top: 300, width: 210, height: 100 },
        { left: 6930, top: 300, width: 300, height: 100 },
        { left: 7500, top: 300, width: 220, height: 100 },
        { left: 8270, top: 300, width: 1930, height: 100 },
        { left: 12278, top: 300, width: 130, height: 100 },
        { left: 13150, top: 300, width: 630, height: 100 },
        { left: 0, top: 390, width: 160, height: 300 },
        { left: 0, top: 690, width: 70, height: 3000 },
        { left: 60, top: 1620, width: 110, height: 300 },
        { left: 60, top: 2575, width: 110, height: 310 },
        { left: 160, top: 2575, width: 110, height: 210 },
        { left: 260, top: 2575, width: 110, height: 120 },
        { left: 60, top: 3345, width: 110, height: 120 },
        { left: 160, top: 3435, width: 110, height: 120 },
        { left: 260, top: 3525, width: 110, height: 120 },
        { left: 360, top: 3615, width: 210, height: 120 },
        { left: 460, top: 3715, width: 300, height: 120 },
        { left: 460, top: 3815, width: 1600, height: 180 },
        { left: 1960, top: 3975, width: 200, height: 220 },
        { left: 1960, top: 4175, width: 100, height: 120 },
        { left: 1660, top: 4295, width: 300, height: 180 },
        { left: 1380, top: 4395, width: 300, height: 180 },
        { left: 980, top: 4490, width: 410, height: 180 },
        { left: 780, top: 4650, width: 220, height: 120 },
        { left: 780, top: 4750, width: 130, height: 120 },
        { left: 780, top: 4870, width: 30, height: 770 },
        { left: 810, top: 5330, width: 100, height: 210 },
        { left: 910, top: 5425, width: 100, height: 20 },
        { left: 670, top: 5600, width: 100, height: 40 },
        { left: 610, top: 5625, width: 100, height: 300 },
        { left: 515, top: 5880, width: 100, height: 430 },
        { left: 415, top: 6280, width: 100, height: 130 },
        { left: 325, top: 6280, width: 100, height: 1530 },
        { left: 425, top: 6960, width: 100, height: 310 },
        { left: 425, top: 7820, width: 200, height: 100 },
        { left: 525, top: 7920, width: 380, height: 100 },
        { left: 710, top: 8020, width: 380, height: 110 },
        { left: 710, top: 8120, width: 290, height: 110 },
        { left: 610, top: 8220, width: 200, height: 110 },
        { left: 510, top: 8320, width: 100, height: 310 },
        { left: 610, top: 8610, width: 100, height: 210 },
        { left: 710, top: 8800, width: 200, height: 110 },
        { left: 810, top: 8900, width: 370, height: 300 },
        { left: 810, top: 9200, width: 300, height: 300 },
        { left: 890, top: 9470, width: 300, height: 300 },
        { left: 1100, top: 9650, width: 1900, height: 400 },
        { left: 1650, top: 9550, width: 970, height: 120 },
        { left: 1740, top: 9450, width: 785, height: 120 },
        { left: 1840, top: 9350, width: 585, height: 120 },
        { left: 1940, top: 9250, width: 200, height: 120 },
        { left: 7940, top: 9690, width: 3000, height: 550 },
        { left: 8530, top: 9600, width: 1950, height: 120 },
        { left: 8630, top: 9500, width: 790, height: 120 },
        { left: 10070, top: 9500, width: 220, height: 120 },
        { left: 8920, top: 9400, width: 410, height: 120 },
        { left: 9000, top: 9300, width: 230, height: 120 },
        { left: 10920, top: 9580, width: 230, height: 120 },
        { left: 11120, top: 9480, width: 230, height: 120 },
        { left: 11220, top: 9380, width: 230, height: 120 },
        { left: 11220, top: 6210, width: 430, height: 1020 },
        { left: 11020, top: 6310, width: 630, height: 900 },
        { left: 10920, top: 6600, width: 630, height: 630 },
        { left: 10820, top: 6890, width: 630, height: 340 },
        { left: 10820, top: 7490, width: 830, height: 870 },
        { left: 10920, top: 7590, width: 730, height: 870 },
        { left: 11020, top: 7690, width: 630, height: 870 },
        { left: 11120, top: 7790, width: 530, height: 870 },
        { left: 11220, top: 7890, width: 430, height: 870 },
        { left: 11320, top: 8690, width: 330, height: 1560 },
        { left: 11510, top: 6110, width: 3730, height: 520 },
        { left: 12080, top: 6000, width: 130, height: 520 },
        { left: 12570, top: 6000, width: 2030, height: 520 },
        { left: 13400, top: 5890, width: 2030, height: 520 },
        { left: 13810, top: 3960, width: 1030, height: 2320 },
        { left: 14210, top: 3760, width: 1030, height: 232 },
        { left: 14310, top: 3660, width: 1030, height: 232 },
        { left: 14480, top: 3470, width: 530, height: 232 },
        { left: 14680, top: 3370, width: 530, height: 232 },
        { left: 14780, top: 3170, width: 530, height: 232 },
        { left: 14680, top: 2770, width: 530, height: 432 },
        { left: 14295, top: -100, width: 530, height: 2822 },
        { left: 12860, top: 2030, width: 610, height: 1080 },
        { left: 12670, top: 2520, width: 610, height: 590 },
        { left: 13250, top: 1920, width: 400, height: 1080 },
        { left: 13350, top: 1820, width: 500, height: 1080 },
        { left: 13450, top: 1720, width: 600, height: 1080 },
        { left: 13550, top: 1620, width: 600, height: 1080 },
        { left: 13820, top: 1440, width: 600, height: 1280 },
        { left: 14120, top: 1340, width: 600, height: 580 },
        { left: 14520, top: 2240, width: 600, height: 580 },
        { left: 13620, top: 220, width: 600, height: 280 },
        { left: 13720, top: 320, width: 600, height: 280 },
        { left: 14120, top: 420, width: 600, height: 280 },
        { left: 14190, top: 520, width: 600, height: 280 },
        { left: 9310, top: -100, width: 500, height: 2150 },
        { left: 9510, top: 400, width: 500, height: 200 },
        { left: 9610, top: 400, width: 500, height: 100 },
        { left: 9790, top: 860, width: 120, height: 1760 },
        { left: 9890, top: 1260, width: 120, height: 1360 },
        { left: 9990, top: 1360, width: 120, height: 1260 },
        { left: 10090, top: 1460, width: 120, height: 1160 },
        { left: 10190, top: 1540, width: 220, height: 1080 },
        { left: 10390, top: 1640, width: 120, height: 980 },
        { left: 10490, top: 1740, width: 120, height: 880 },
        { left: 9410, top: 1720, width: 1370, height: 500 },
        { left: 10280, top: 2020, width: 1250, height: 500 },
        { left: 10840, top: 2120, width: 800, height: 590 },
        { left: 11140, top: 2220, width: 500, height: 590 },
        { left: 11330, top: 2610, width: 200, height: 290 },
        { left: 11530, top: 2410, width: 200, height: 290 },
        { left: 10700, top: 1910, width: 730, height: 290 },
        { left: 8280, top: 220, width: 460, height: 290 },
        { left: 8350, top: 320, width: 460, height: 370 },
        { left: 8650, top: 410, width: 460, height: 370 },
        { left: 8750, top: 510, width: 460, height: 370 },
        { left: 8850, top: 610, width: 460, height: 370 },
        { left: 9030, top: 710, width: 460, height: 750 },
        { left: 9120, top: 1400, width: 460, height: 240 },
        { left: 9220, top: 1600, width: 460, height: 240 },
        { left: 9600, top: 2190, width: 460, height: 240 },
        { left: 10700, top: 1820, width: 460, height: 240 },
        { left: 12730, top: 2420, width: 460, height: 240 },
        { left: 12940, top: 2970, width: 230, height: 240 },
        { left: 14580, top: 2670, width: 230, height: 240 },
      ],
      imageWidth: 0,
      imageHeight: 0,
      imageWidthCharacter: 0,
      imageHeightCharacter: 0,
      backgroundPosition: "50% 50%", // Pozycja planszy w poziomie i pionie
    };

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    this.startMoving();
    this.loadPositionFromLocalStorage();
    this.componentDidMountImage();
    this.componentDidMountImageCharacter();
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    this.stopMoving();
  }

  handleKeyDown = (e: KeyboardEvent) => {
    const { keysPressed } = this.state;
    keysPressed.add(e.key);
    this.setState({ keysPressed });
  };

  handleKeyUp = (e: KeyboardEvent) => {
    const { keysPressed } = this.state;
    keysPressed.delete(e.key);
    this.setState({ keysPressed });
  };

  startMoving = () => {
    this.interval = setInterval(this.moveDiv, 16); // Aktualizacja co ~16 ms (ok. 60 FPS)
  };

  stopMoving = () => {
    clearInterval(this.interval);
  };

  loadPositionFromLocalStorage() {
    const savedPosition = localStorage.getItem("divPosition");
    if (savedPosition) {
      const position = JSON.parse(savedPosition);
      this.setState({ top: position.top, left: position.left });
    }
  }

  savePositionToLocalStorage() {
    const { top, left } = this.state;
    const position = { top, left };
    localStorage.setItem("divPosition", JSON.stringify(position));
  }

  moveDiv = () => {
    const speed = this.MovmentSpeed; // Prędkość poruszania DIVa
    const { keysPressed, top, left, walls } = this.state;
    let newTop = top;
    let newLeft = left;

    if (keysPressed.has("a")) {
      newLeft -= speed;
    }
    if (keysPressed.has("d")) {
      newLeft += speed;
    }
    if (keysPressed.has("w")) {
      newTop -= speed;
    }
    if (keysPressed.has("s")) {
      newTop += speed;
    }

    // Sprawdzanie granic kontenera
    const divWidth = 50;
    const divHeight = 50;
    const containerWidth =
      this.containerRef.current?.offsetWidth || window.innerWidth;
    const containerHeight =
      this.containerRef.current?.offsetHeight || window.innerHeight;

    if (newLeft < 0) {
      newLeft = 0;
    } else if (newLeft > containerWidth - divWidth) {
      newLeft = containerWidth - divWidth;
    }

    if (newTop < 0) {
      newTop = 0;
    } else if (newTop > containerHeight - divHeight) {
      newTop = containerHeight - divHeight;
    }

    // Sprawdzanie kolizji ze ścianami
    for (const wall of walls) {
      if (
        newLeft + divWidth > wall.left &&
        newLeft < wall.left + wall.width &&
        newTop + divHeight > wall.top &&
        newTop < wall.top + wall.height
      ) {
        // Kolizja ze ścianą
        const leftDistance = newLeft + divWidth - wall.left;
        const rightDistance = wall.left + wall.width - newLeft;
        const topDistance = newTop + divHeight - wall.top;
        const bottomDistance = wall.top + wall.height - newTop;

        if (
          leftDistance < rightDistance &&
          leftDistance < topDistance &&
          leftDistance < bottomDistance
        ) {
          // Przeszkoda jest z lewej strony, zablokuj ruch w lewo
          newLeft = wall.left - divWidth;
        } else if (
          rightDistance < leftDistance &&
          rightDistance < topDistance &&
          rightDistance < bottomDistance
        ) {
          // Przeszkoda jest z prawej strony, zablokuj ruch w prawo
          newLeft = wall.left + wall.width;
        } else if (
          topDistance < leftDistance &&
          topDistance < rightDistance &&
          topDistance < bottomDistance
        ) {
          // Przeszkoda jest u góry, zablokuj ruch w górę
          newTop = wall.top - divHeight;
        } else if (
          bottomDistance < leftDistance &&
          bottomDistance < rightDistance &&
          bottomDistance < topDistance
        ) {
          // Przeszkoda jest na dole, zablokuj ruch w dół
          newTop = wall.top + wall.height;
        }
      }
    }

    const backgroundY = -(newTop - window.innerHeight / 2);
    const backgroundX = -(newLeft - window.innerWidth / 2);

    this.setState(
      {
        top: newTop,
        left: newLeft,
        backgroundPosition: `${backgroundX}px ${backgroundY}px`,
      },
      () => {
        this.savePositionToLocalStorage(); // Zapisz pozycję po każdym ruchu
      }
    );
  };

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
      top,
      left,
      walls,
      imageWidth,
      imageHeight,
      imageWidthCharacter,
      imageHeightCharacter,
      backgroundPosition,
    } = this.state;

    const wallAnimationOffsetX = left - window.innerWidth / 2;
    const wallAnimationOffsetY = top - window.innerHeight / 2;

    const { usernames, textValue } = this.props;
    return (
      <>
        <MainMap
          bgPosition={backgroundPosition}
          imgW={imageWidth}
          imgH={imageHeight}
          refs={this.containerRef}
        >
          {walls.map((wall, index) => (
            <Wall
              key={index}
              style={{
                left: `${wall.left - wallAnimationOffsetX}px`,
                top: `${wall.top - wallAnimationOffsetY}px`,
                width: `${wall.width}px`,
                height: `${wall.height}px`,
                backgroundColor: "red", // Kolor ściany
              }}
            />
          ))}
          {usernames.map((user) => (
            <div
              key={user.id}
              id={user.id}
              style={{
                color: user.id === textValue ? "red" : "black",
                position: "absolute",
                left: user.position ? `${user.position.x}px` : "0",
                top: user.position ? `${user.position.y}px` : "0",
              }}
            >
              {user.userName}
            </div>
          ))}

          <div
            style={{
              top: `${window.innerHeight / 2}px`,
              left: `${window.innerWidth / 2}px`,
              position: "absolute",
              width: "50px",
              height: "50px",
              backgroundColor: "blue",
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
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
            </div>
          </div>
        </MainMap>
      </>
    );
  }
}

export default MovingDiv;
