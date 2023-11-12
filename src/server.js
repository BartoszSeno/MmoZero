const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const clients = []; // Tablica klientów do obsługi SSE
const userColors = {}; // Obiekt przechowujący kolory użytkowników

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  const data = JSON.parse(fs.readFileSync("data/Loggindata.json"));
  const clientId = data.id;
  clients.push({ res, clientId }); // Dodaj klienta do tablicy klientów
  userColors[clientId] = "red"; // Ustaw domyślny kolor na czerwony

  req.on("close", () => {
    // Usuń klienta z tablicy po zamknięciu połączenia
    const index = clients.findIndex((client) => client.res === res);
    if (index !== -1) {
      clients.splice(index, 1);
      delete userColors[clientId];
    }
  });
});

// Funkcja do wysyłania wiadomości do wszystkich klientów
function sendToClients(message) {
  clients.forEach((client) => {
    const clientId = client.clientId;
    const messageWithColor = { ...message, color: userColors[clientId] };
    client.res.write(`data: ${JSON.stringify(messageWithColor)}\n\n`);
  });
}

app.post("/save-username", (req, res) => {
  const { username, UserID } = req.body;

  // Odczytaj istniejący plik JSON
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync("data/Loggindata.json"));
  } catch (error) {
    // Jeśli plik nie istnieje, zostanie utworzony pusty
  }

  // Wygeneruj unikalny ID dla nowego użytkownika
  const newUserId = data.length + 1;

  // Dodaj nowego użytkownika z ID do danych
  data.push({ id: UserID, userName: username });

  // Zapisz dane z powrotem do pliku JSON
  fs.writeFileSync("data/Loggindata.json", JSON.stringify(data, null, 2));

  // Po zapisaniu nowego użytkownika, wyślij informację do wszystkich klientów
  sendToClients({ success: true });

  res.send({ success: true });
});
setInterval(() => {
  app.post("/update-player-position", (req, res) => {
    const { userID, position, IdValue } = req.body;

    let data = [];
    try {
      data = JSON.parse(fs.readFileSync("data/Loggindata.json"));
    } catch (error) {
      // Jeśli plik nie istnieje, zostanie utworzony pusty
    }

    // Znajdź użytkownika po userID i zaktualizuj jego pozycję
    const userIndex = data.findIndex((user) => user.id === IdValue);
    if (userIndex !== -1) {
      data[userIndex].position = position;
    }

    fs.writeFileSync("data/Loggindata.json", JSON.stringify(data, null, 2));

    // Po aktualizacji pozycji gracza, wyślij informację do klientów, że dane się zmieniły
    sendToClients({ success: true });

    res.send({ success: true });
  });
}, 16);
app.get("/get-username", (req, res) => {
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync("data/Loggindata.json"));
  } catch (error) {
    // Jeśli plik nie istnieje, zostanie zwrócony pusty JSON
  }

  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
