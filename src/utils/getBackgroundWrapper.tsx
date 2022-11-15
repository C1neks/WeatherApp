import React from "react";
import {
  WrapperCloud,
  WrapperDefault,
  WrapperRain,
  WrapperSun,
} from "../Weather/Weather.styles";

export const getBackgroundWrapper = (background: string) => {
  if (background.includes("rain")) return WrapperRain;
  if (background.includes("cloud")) return WrapperCloud;
  if (background.includes("sun") || background.includes("clear"))
    return WrapperSun;

  return WrapperDefault;
};
