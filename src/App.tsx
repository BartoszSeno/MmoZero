/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPlace from "./MainGame";

function App() {
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
