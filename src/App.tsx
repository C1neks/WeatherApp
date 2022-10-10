import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Weather from "./Weather/Weather";
import MainPage from "./MainPage/MainPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/forecast" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;
