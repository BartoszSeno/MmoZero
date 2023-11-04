import React, { Component } from "react";

interface MovingDivState {
  top: number;
  left: number;
  keysPressed: Set<string>;
}

class MovingDiv extends Component<{}, MovingDivState> {
  interval: NodeJS.Timer | undefined;
  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: {}) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      keysPressed: new Set<string>(),
    };
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    this.startMoving();
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

  moveDiv = () => {
    const speed = 10; // Prędkość poruszania DIVa
    const { keysPressed, top, left } = this.state;
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
    const containerWidth = this.containerRef.current?.offsetWidth || 400;
    const containerHeight = this.containerRef.current?.offsetHeight || 400;
    const divWidth = 50;
    const divHeight = 50;

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
    const wall1Left = 100;
    const wall1Top = 150;
    const wall1Width = 20;
    const wall1Height = 100;

    const wall2Left = 200;
    const wall2Top = 50;
    const wall2Width = 20;
    const wall2Height = 100;

    if (
      newLeft + divWidth > wall1Left &&
      newLeft < wall1Left + wall1Width &&
      newTop + divHeight > wall1Top &&
      newTop < wall1Top + wall1Height
    ) {
      // Kolizja ze ścianą 1
      if (newLeft + divWidth > wall1Left && newLeft < wall1Left) {
        newLeft = wall1Left - divWidth;
      } else if (
        newLeft < wall1Left + wall1Width &&
        newLeft + divWidth > wall1Left + wall1Width
      ) {
        newLeft = wall1Left + wall1Width;
      }
    }

    if (
      newLeft + divWidth > wall2Left &&
      newLeft < wall2Left + wall2Width &&
      newTop + divHeight > wall2Top &&
      newTop < wall2Top + wall2Height
    ) {
      // Kolizja ze ścianą 2
      if (newLeft + divWidth > wall2Left && newLeft < wall2Left) {
        newLeft = wall2Left - divWidth;
      } else if (
        newLeft < wall2Left + wall2Width &&
        newLeft + divWidth > wall2Left + wall2Width
      ) {
        newLeft = wall2Left + wall2Width;
      }
    }

    this.setState({ top: newTop, left: newLeft });
  };

  render() {
    const { top, left } = this.state;

    const containerStyle: React.CSSProperties = {
      width: "400px",
      height: "400px",
      position: "relative", // Tutaj używamy typu React.CSSProperties
      border: "1px solid black",
    };

    const wall1Style: React.CSSProperties = {
      left: "100px",
      top: "150px",
      width: "20px",
      height: "100px",
      position: "absolute",
      backgroundColor: "red",
    };

    const wall2Style: React.CSSProperties = {
      left: "200px",
      top: "50px",
      width: "20px",
      height: "100px",
      position: "absolute",
      backgroundColor: "red",
    };

    const divStyle = {
      top: `${top}px`,
      left: `${left}px`,
      position: "absolute" as "absolute",
      width: "50px",
      height: "50px",
      backgroundColor: "blue",
    };

    return (
      <div style={containerStyle} ref={this.containerRef}>
        <div style={wall1Style}></div>
        <div style={wall2Style}></div>
        <div style={divStyle}></div>
      </div>
    );
  }
}

export default MovingDiv;
