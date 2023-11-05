import React, { Component } from "react";
import Wall from "./Wall";

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

class MovingDiv extends Component<{}, MovingDivState> {
  interval: NodeJS.Timer | undefined;
  containerRef: React.RefObject<HTMLDivElement>;

  // fast accest to modivy the world
  //============================================
  MovmentSpeed = 10;

  MainMapImage =
    "https://raw.githubusercontent.com/BartoszSeno/ClickerZero/main/src/assets/MainImg/MainBg2.png";

  MainCharacter =
    "https://raw.githubusercontent.com/BartoszSeno/ClickerZero/main/src/assets/MainImg/Characters/Joanna.gif";

  //============================================
  constructor(props: {}) {
    super(props);

    this.state = {
      top: window.innerHeight / 2 - 25,
      left: window.innerWidth / 2 - 25,
      keysPressed: new Set<string>(),
      walls: [
        { left: 100, top: 150, width: 20, height: 100 },
        { left: 200, top: 50, width: 20, height: 100 },
        { left: 200, top: 250, width: 20, height: 100 },
        { left: 2000, top: 250, width: 20, height: 100 },
        { left: 2000, top: 550, width: 20, height: 100 },
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
    // this.loadPositionFromLocalStorage();
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
    const { keysPressed, top, left, walls, backgroundPosition } = this.state;
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

    const backgroundX = -(newLeft - window.innerWidth / 2);
    const backgroundY = -(newTop - window.innerHeight / 2);

    this.setState(
      {
        top: newTop,
        left: newLeft,
        backgroundPosition: `${backgroundX}px ${backgroundY}px`,
      },
      () => {
        // this.savePositionToLocalStorage(); // Zapisz pozycję po każdym ruchu
      }
    );
  };

  componentDidMountImage() {
    const image = new Image();
    image.src = this.MainMapImage;
    image.onload = () => {
      const imageWidth = image.width;
      const imageHeight = image.height;
      this.setState({ imageWidth, imageHeight });
    };
  }

  componentDidMountImageCharacter() {
    const image = new Image();
    image.src = this.MainCharacter;
    image.onload = () => {
      const imageWidthCharacter = image.width;
      const imageHeightCharacter = image.height;
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

    const GameMap: React.CSSProperties = {
      width: imageWidth + "px",
      height: imageHeight + "px",
      position: "relative",
      border: "1px solid black",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${this.MainMapImage})`,
      backgroundSize: "cover",
      backgroundPosition,
    };
    const wallAnimationOffsetX = left - window.innerWidth / 2; // Zmień wartość 0.5 na dowolną, aby dostosować prędkość ruchu ścian
    const wallAnimationOffsetY = top - window.innerHeight / 2;

    return (
      <>
        <div style={GameMap} ref={this.containerRef}>
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
              <img src={this.MainCharacter} alt="Main Character" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MovingDiv;
