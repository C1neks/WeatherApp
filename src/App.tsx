import React from "react";
import { Routes, Route } from "react-router-dom";
import Weather from "./Weather/Weather";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;
