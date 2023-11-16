/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPlace from "./MainGame";
import React, { useEffect, useState } from "react";

function App() {
  const [usernames, setUsernames] = useState([]);

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
  // Funkcja do obsługi przewijania strony za pomocą klawiatury
  const handleScroll = (e) => {
    const speed = 20;

    switch (e.key) {
      case "w":
        window.scrollBy(0, -speed); // Przewij w górę
        break;
      case "a":
        window.scrollBy(-speed, 0); // Przewij w lewo
        break;
      case "s":
        window.scrollBy(0, speed); // Przewij w dół
        break;
      case "d":
        window.scrollBy(speed, 0); // Przewij w prawo
        break;
      default:
        break;
    }
  };

  //console.log(usernames[1].position.x);

  useEffect(() => {
    // Dodajmy nasłuchiwanie zdarzeń klawiatury
    window.addEventListener("keydown", handleScroll);
    window.requestAnimationFrame(handleScroll);

    // Usuwamy nasłuchiwanie po wyjściu z komponentu, aby uniknąć wycieków pamięci.
    return () => {
      window.removeEventListener("keydown", handleScroll);
    };
  }, []);

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
