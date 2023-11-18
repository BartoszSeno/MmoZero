/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MovingDiv from "../hook/Moving";

export let UserIDFromMainPlace;

function MainPlace() {
  const [isLoggin, setIsLoggin] = useState(true);
  const [username, setUsername] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [UserID, setUserID] = useState("");

  //================================================================
  const screenWidth = window.innerWidth; // Szerokość ekranu
  const screenHeight = window.innerHeight; // Wysokość ekranu
  const initialX = screenWidth / 2; // x na środku
  const initialY = screenHeight / 2; // y na środku
  const [playerPosition, setPlayerPosition] = useState({
    x: initialX,
    y: initialY,
  });
  //================================================================

  const [pressedKeys, setPressedKeys] = useState({});
  const [textValue, setTextValue] = useState("");

  //================================================================
  const [wallsN, setwallsN] = useState([
    { x: 100, y: 100, width: 50, height: 200 },
    // Dodaj więcej ścian według potrzeb
  ]);
  //================================================================

  const getUniqueID = () => {
    const s4 = () =>
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return s4() + s4() + "-" + s4();
  };

  useEffect(() => {
    const newUserID = getUniqueID(); // Wygeneruj nowy unikalny identyfikator UUID
    setUserID(newUserID);
    
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const fetchUsernames = async () => {
    try {
      const response = await fetch("http://localhost:3001/get-username");
      const data = await response.json();
      setUsernames(data);
    } catch (error) {
      console.error("Błąd podczas pobierania nazw użytkowników:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/save-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, UserID }),
      });
      const result = await response.json();
      if (result.success) {
        setUsername("");
        setIsSubmitted(true); // Ustaw stan, aby ukryć formularz
        fetchUsernames(); // Pobierz zaktualizowaną listę użytkowników
      }
    } catch (error) {
      console.error("Błąd podczas zapisywania nazwy użytkownika:", error);
    }
  };

  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/sse");
    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.success) {
        fetchUsernames(); // Pobierz zaktualizowaną listę użytkowników
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const sendPlayerPosition = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/update-player-position",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: UserID,
            position: playerPosition,
            IdValue: textValue,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        // Aktualizacja zakończona sukcesem
      }
    } catch (error) {
      console.error("Błąd podczas aktualizacji pozycji gracza:", error);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const speed = 5;
      const newPosition = { ...playerPosition };
      const divWidth = 50;
      const divHeight = 50;

      // Skopiuj obecny stan pressedKeys
      const updatedPressedKeys = { ...pressedKeys };

      // Zaktualizuj tylko naciśnięty klawisz
      updatedPressedKeys[e.key] = e.type === "keydown";

      if (updatedPressedKeys["a"]) newPosition.x -= speed;
      if (updatedPressedKeys["d"]) newPosition.x += speed;
      if (updatedPressedKeys["w"]) newPosition.y -= speed;
      if (updatedPressedKeys["s"]) newPosition.y += speed;

      // Aktualizuj pozycję tylko jeśli nie wychodzi poza granice ekranu
      const maxX = window.innerWidth - divWidth;
      const maxY = window.innerHeight - divHeight;

      newPosition.x = Math.max(0, Math.min(newPosition.x));
      newPosition.y = Math.max(0, Math.min(newPosition.y));

      const collidesWithWall = wallsN.some((wall) => {
        const playerRight = newPosition.x + divWidth;
        const playerBottom = newPosition.y + divHeight;
        const wallRight = wall.x + wall.width;
        const wallBottom = wall.y + wall.height;

        if (
          newPosition.x < wallRight &&
          playerRight > wall.x &&
          newPosition.y < wallBottom &&
          playerBottom > wall.y
        ) {
          const overlapX =
            Math.min(playerRight, wallRight) - Math.max(newPosition.x, wall.x);
          const overlapY =
            Math.min(playerBottom, wallBottom) -
            Math.max(newPosition.y, wall.y);

          if (overlapX < overlapY) {
            if (playerRight < wallRight) {
              newPosition.x = wall.x - divWidth;
            } else {
              newPosition.x = wallRight;
            }
          } else {
            if (playerBottom < wallBottom) {
              newPosition.y = wall.y - divHeight;
            } else {
              newPosition.y = wallBottom;
            }
          }
        }
      });

      if (!collidesWithWall) {
        setPlayerPosition(newPosition);
        sendPlayerPosition();
      }

      // Update the pressed keys
      setPressedKeys(updatedPressedKeys);
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyPress);
    window.requestAnimationFrame(handleKeyPress);

    // Usuń nasłuchiwacze zdarzeń, gdy komponent zostanie odmontowany
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [pressedKeys]);

  //===============

  const hangleText = (e) => {
    setTextValue(e.target.value);
    UserIDFromMainPlace = e.target.value;
  };

  const hangleSubmit = (e) => {
    setIsLoggin(false);
    e.preventDefault();
  };
  return (
    <>
      {isLoggin ? (
        <>
          <div>
            <form onSubmit={hangleSubmit}>
              <label>
                Wprowadź coś:
                <input type="text" value={textValue} onChange={hangleText} />
              </label>
              <button type="submit">Wyślij</button>
            </form>
          </div>
        </>
      ) : (
        <>
          <MovingDiv
            usernames={usernames}
            textValue={textValue}
            wallsN={wallsN}
          />
        </>
      )}
    </>
  );
}

export default MainPlace;
