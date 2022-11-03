import { WeatherForecastIcon } from "./Weather.styles";
import { WiCloud, WiDaySunny, WiRain } from "react-icons/wi";
import React from "react";

const forecastIconGenerator = (icon: string) => {
  const iconToRender =
    icon === "rain" ? (
      <WeatherForecastIcon>
        <WiRain />
      </WeatherForecastIcon>
    ) : icon === "partly-cloudy-day" ? (
      <WeatherForecastIcon>
        <WiCloud />
      </WeatherForecastIcon>
    ) : (
      <WeatherForecastIcon>
        <WiDaySunny />
      </WeatherForecastIcon>
    );

  return iconToRender;
};

export default forecastIconGenerator;
