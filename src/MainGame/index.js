/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MovingDiv from "../hook/Moving";

function MainPlace() {
  const [isLoggin, setIsLoggin] = useState(true);
  const [username, setUsername] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [UserID, setUserID] = useState("");
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [pressedKeys, setPressedKeys] = useState({});
  const [textValue, setTextValue] = useState("");

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

  const handleKeyPress = (e) => {
    const speed = 5;
    const newPosition = { ...playerPosition };

    // Zaktualizuj obiekt pressedKeys o naciśnięcie lub puszczenie klawisza
    setPressedKeys((prevKeys) => ({
      ...prevKeys,
      [e.key]: e.type === "keydown",
    }));

    if (pressedKeys["a"]) newPosition.x -= speed;
    if (pressedKeys["d"]) newPosition.x += speed;
    if (pressedKeys["w"]) newPosition.y -= speed;
    if (pressedKeys["s"]) newPosition.y += speed;

    // Sprawdź czy nowa pozycja nie wychodzi poza granice ekranu
    const maxX = window.innerWidth - 100; // Ustaw odpowiednią szerokość diva
    const maxY = window.innerHeight - 100; // Ustaw odpowiednią wysokość diva

    newPosition.x = Math.max(0, Math.min(newPosition.x, maxX));
    newPosition.y = Math.max(0, Math.min(newPosition.y, maxY));

    setPlayerPosition(newPosition);
    sendPlayerPosition(); // Wyślij aktualizację pozycji gracza na serwer
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyPress);

    // Usuń nasłuchiwacze zdarzeń, gdy komponent zostanie odmontowany
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [playerPosition, pressedKeys]);

  //===============

  const hangleText = (e) => {
    setTextValue(e.target.value);
  };

  const hangleSubmit = (e) => {
    setIsLoggin(false);
    e.preventDefault();
  };
  console.log(textValue);
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
          <MovingDiv usernames={usernames} textValue={textValue} />
        </>
      )}
    </>
  );
}

export default MainPlace;
