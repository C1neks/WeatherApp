import { Cloud, Rain, Sad, Sun, WeatherIcon } from "./Weather.styles";
import React from "react";

const weatherIconGenerator = (icon: string) => {
  const iconToRender = (
    <WeatherIcon background={icon}>
      {icon.includes("rain") ? (
        <Rain />
      ) : icon.includes("sun") ? (
        <Sun />
      ) : icon.includes("cloud") ? (
        <Cloud />
      ) : icon.includes("clear") ? (
        <Sun />
      ) : (
        <Sad />
      )}
    </WeatherIcon>
  );

  return iconToRender;
};

export default weatherIconGenerator;
