import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPlace, { UserIDFromMainPlace } from "./MainGame";
import React, { useEffect, useState } from "react";

function App() {
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

  const fetchUsernames = async () => {
    try {
      const response = await fetch("http://localhost:3001/get-username");
      const data = await response.json();
      setUsernames(data);
    } catch (error) {
      console.error("Błąd podczas pobierania nazw użytkowników:", error);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const speed = 17;
      const { key } = e;
      const isW = key === "w" || key === "W";
      const isA = key === "a" || key === "A";
      const isS = key === "s" || key === "S";
      const isD = key === "d" || key === "D";

      const foundUser = usernames.find(
        (user) => user.id === UserIDFromMainPlace
      );

      if (foundUser && foundUser.position) {
        const { x, y } = foundUser.position; // Pobranie pozycji użytkownika

        // Tu możesz wykonać odpowiednie działania na podstawie pozycji
        console.log(`User ${foundUser.id} is at position (${x}, ${y})`);

        // Dodatkowe działania na podstawie pozycji użytkownika
      } else {
        console.log("User not found or position undefined");
      }

      if (foundUser.position.x >= 960) {
        if (isD) {
          window.scrollBy(speed, 0); // Scroll right by 50 pixels
        }
      }
      if (foundUser.position.x <= 5025) {
        if (isA) {
          window.scrollBy(-speed, 0); // Scroll left by 50 pixels
        }
      }

      if (foundUser.position.y >= 485) {
        if (isS) {
          window.scrollBy(0, speed); // Scroll down by 50 pixels
        }
      }
      if (foundUser.position.y <= 5560) {
        if (isW) {
          window.scrollBy(0, -speed); // Scroll up by 50 pixels
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [usernames, UserIDFromMainPlace]);

  return (
    <>
      <BrowserRouter basename="/MmoZero">
        <Routes>
          <Route path="/" element={<MainPlace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
