import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <div>MAIN PAGE!</div>
      <Link to="/forecast">Forecast</Link>
    </>
  );
};

export default MainPage;
