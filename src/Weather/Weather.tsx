import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCelsiusLine } from "react-icons/ri";
import { FiSun } from "react-icons/fi";
import { WiDegrees } from "react-icons/wi";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import {
  ActualTemp,
  Degree,
  ForecastLocation,
  HighestAndLowest,
  MainInfo,
  TodayForecastDetails,
  TopInfo,
  WeatherIcon,
  WeatherIconWrapper,
  WeatherInfo,
  Wrapper,
} from "./Weather.styles";
import { IconContext } from "react-icons";
const API_KEY = process.env.REACT_APP_API_KEY;

const Weather = () => {
  let { locationID } = useParams();
  const timeElapsed = Date.now();
  const today: any = new Date(timeElapsed);

  const todayDate = new Date();
  const time =
    todayDate.getHours() +
    ":" +
    todayDate.getMinutes() +
    ":" +
    todayDate.getSeconds();
  console.log(todayDate);
  console.log(time);
  const [forecast, setForecast] = useState<any>({ days: [] });
  const getWeatherForecast = async () => {
    const result = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationID}?unitGroup=metric&include=days%2Chours&key=${API_KEY}&contentType=json`
    );
    return result.json();
  };

  useEffect(() => {
    (async () => {
      const result = await getWeatherForecast();

      setForecast(result);
    })();
  }, []);

  return (
    <Wrapper>
      <TopInfo>
        <GiHamburgerMenu />
        <div>{today.toDateString()}</div>
        <RiCelsiusLine />
      </TopInfo>

      <MainInfo>
        <WeatherInfo>
          {/*<div>{forecast.resolvedAddress}</div>*/}
          <ForecastLocation>{forecast.address}</ForecastLocation>
          {forecast.days.map((x: any, i: number) => (
            <div key={x.datetimeEpoch}>
              {i === 0 ? (
                <div>
                  <TodayForecastDetails>
                    <IconContext.Provider
                      value={{ color: "white", size: "80" }}
                    >
                      <ActualTemp>
                        {x.temp}
                        <span>
                          <WiDegrees />
                        </span>
                      </ActualTemp>
                    </IconContext.Provider>
                    <HighestAndLowest>
                      <h4>
                        <BiChevronUp /> {x.tempmax}
                      </h4>
                      <h4>
                        <BiChevronDown />
                        {x.tempmin}
                      </h4>
                    </HighestAndLowest>

                    <h4>{x.conditions}</h4>
                    <h4>Feels like {x.feelslike}</h4>
                    <h4>{x.icon}</h4>
                  </TodayForecastDetails>
                  {x.hours.map((hour: any) => (
                    <div key={hour.datetime}>
                      <p>
                        {hour.datetime >= time
                          ? hour.datetime + " " + hour.temp
                          : null}
                      </p>
                    </div>
                  ))}
                  <p>Sunrise: {x.sunrise}</p> <p>Sunset: {x.sunset}</p>{" "}
                  <p>humidity: {x.humidity}</p> <p>{x.windspeed + "km/h"}</p>{" "}
                  <p>Precipitation: {x.precipprob}</p>{" "}
                  <p>Pressure: {x.pressure}</p>
                </div>
              ) : null}
            </div>
          ))}
        </WeatherInfo>
        <IconContext.Provider value={{ color: "white", size: "200" }}>
          <WeatherIconWrapper>
            <WeatherIcon>
              <FiSun />
            </WeatherIcon>
          </WeatherIconWrapper>
        </IconContext.Provider>
      </MainInfo>

      {/*{forecast.days.map((x: any, i: number) => (*/}
      {/*  <div key={x.datetimeEpoch}>*/}
      {/*    {i === 0 ? (*/}
      {/*      <div>*/}
      {/*        <h3>Data {x.datetime}</h3>*/}
      {/*        <h4>Actual Temperature {x.temp}</h4>*/}
      {/*        <h4>Max Temperature {x.tempmax}</h4>*/}
      {/*        <h4>Min Temperature {x.tempmin}</h4>*/}
      {/*        <h4>{x.conditions}</h4>*/}
      {/*        <h4>Feels like {x.feelslike}</h4>*/}
      {/*        <h4>{x.icon}</h4>*/}
      {/*        <p>Sunrise: {x.sunrise}</p> <p>Sunset: {x.sunset}</p>{" "}*/}
      {/*        <p>humidity: {x.humidity}</p> <p>{x.windspeed + "km/h"}</p>{" "}*/}
      {/*        <p>Precipitation: {x.precipprob}</p> <p>Pressure: {x.pressure}</p>*/}
      {/*        {x.hours.map((hour: any) => (*/}
      {/*          <div key={hour.datetime}>*/}
      {/*            <p>*/}
      {/*              {hour.datetime >= time*/}
      {/*                ? hour.datetime + " " + hour.temp*/}
      {/*                : null}*/}
      {/*            </p>*/}
      {/*          </div>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    ) : (*/}
      {/*      <div>*/}
      {/*        <h3>Data {x.datetime}</h3>*/}
      {/*        <h4>{x.icon}</h4>*/}
      {/*        <p>{x.precipprob}</p>*/}
      {/*        <h4>Max Temperature {x.tempmax}</h4>*/}
      {/*        <h4>Min Temperature {x.tempmin}</h4>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*))}*/}
    </Wrapper>
  );
};

export default Weather;
