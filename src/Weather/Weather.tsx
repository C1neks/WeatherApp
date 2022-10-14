import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCelsiusLine } from "react-icons/ri";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import {
  ActualTemp,
  Conditions,
  DetailName,
  Details,
  DetailValue,
  FeelsLike,
  ForecastLocation,
  HighestAndLowest,
  HourForecast,
  HourForecastWrapper,
  LaterForecast,
  MainInfo,
  MaxMinForecast,
  MaxMinSpan,
  MoreDetails,
  StyledDegree,
  StyledHours,
  Sun,
  TodayForecastDetails,
  TopInfo,
  WeatherIcon,
  WeatherIconWrapper,
  WeatherInfo,
  WeekDay,
  Wrapper,
} from "./Weather.styles";
import { IconContext } from "react-icons";
const API_KEY = process.env.REACT_APP_API_KEY;

const Weather = () => {
  const getWeekDay = (epoch: any) => {
    const result =
      Math.floor((epoch / (24 * 3600)) % 7) === 0 ? (
        <div>Thursday</div>
      ) : Math.floor((epoch / (24 * 3600)) % 7) === 1 ? (
        <div>Friday</div>
      ) : Math.floor((epoch / (24 * 3600)) % 7) === 2 ? (
        <div>Saturday</div>
      ) : Math.floor((epoch / (24 * 3600)) % 7) === 3 ? (
        <div>Sunday</div>
      ) : Math.floor((epoch / (24 * 3600)) % 7) === 4 ? (
        <div>Monday</div>
      ) : Math.floor((epoch / (24 * 3600)) % 7) === 5 ? (
        <div>Tuesday</div>
      ) : Math.floor((epoch / (24 * 3600)) % 7) === 6 ? (
        <div>Wednesday</div>
      ) : null;

    return result;
  };
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
  const [forecast, setForecast] = useState<any>({ address: "", days: [] });
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
          <ForecastLocation>
            {forecast.address.charAt(0).toUpperCase() +
              forecast.address.slice(1)}
          </ForecastLocation>
          {forecast.days.map((x: any, i: number) => (
            <div key={x.datetimeEpoch}>
              {i === 0 ? (
                <div>
                  <TodayForecastDetails>
                    <IconContext.Provider
                      value={{ color: "white", size: "80" }}
                    >
                      <ActualTemp>
                        {x.temp.toFixed(0)}
                        <span>&#176;</span>
                      </ActualTemp>
                    </IconContext.Provider>
                    <HighestAndLowest>
                      <h4>
                        <BiChevronUp /> {x.tempmax.toFixed(0)}
                      </h4>
                      <h4>
                        <BiChevronDown />
                        {x.tempmin.toFixed(0)}
                      </h4>
                    </HighestAndLowest>

                    <Conditions>{x.conditions}</Conditions>
                    <FeelsLike>
                      Feels like {x.feelslike.toFixed(0)} <span>&#176;</span>
                    </FeelsLike>
                    {/*<h4>{x.icon}</h4>*/}
                  </TodayForecastDetails>
                  <HourForecastWrapper>
                    {x.hours.map((hour: any) =>
                      hour.datetime >= time ? (
                        <>
                          {
                            <HourForecast>
                              <StyledHours>
                                {hour.datetime.slice(0, 2)}
                                <span>pm</span>
                              </StyledHours>
                              <StyledDegree>
                                {hour.temp.toFixed(0)}
                                <span>&#176;</span>
                              </StyledDegree>
                            </HourForecast>
                          }
                        </>
                      ) : null
                    )}
                  </HourForecastWrapper>
                  <MoreDetails>
                    <Details>
                      <DetailName>Sunrise</DetailName>{" "}
                      <DetailValue>{x.sunrise}</DetailValue>
                    </Details>
                    <Details>
                      <DetailName>Sunset</DetailName>{" "}
                      <DetailValue>{x.sunset}</DetailValue>
                    </Details>
                    <Details>
                      <DetailName>Humidity</DetailName>{" "}
                      <DetailValue>{x.humidity}</DetailValue>
                    </Details>
                    <Details>
                      <DetailName>Wind</DetailName>
                      <DetailValue>{x.windspeed + "km/h"}</DetailValue>
                    </Details>{" "}
                    <Details>
                      <DetailName>Precipitation</DetailName>{" "}
                      <DetailValue>{x.precipprob + "%"}</DetailValue>
                    </Details>{" "}
                    <Details>
                      <DetailName>Pressure</DetailName>{" "}
                      <DetailValue>
                        {x.pressure.toFixed(0) + " hPa"}
                      </DetailValue>
                    </Details>
                  </MoreDetails>
                </div>
              ) : i > 0 && i <= 6 ? (
                <LaterForecast>
                  <WeekDay>{getWeekDay(x.datetimeEpoch)}</WeekDay>
                  {x.icon === "rain" ? (
                    <div style={{ width: "33%" }}>
                      <WiRain />
                    </div>
                  ) : x.icon === "partly-cloudy-day" ? (
                    <div>
                      <WiCloud />
                    </div>
                  ) : (
                    <div>
                      <WiDaySunny />
                    </div>
                  )}
                  <MaxMinForecast>
                    <MaxMinSpan>{x.tempmax.toFixed(0)}</MaxMinSpan>
                    <MaxMinSpan>{x.tempmin.toFixed(0)}</MaxMinSpan>
                  </MaxMinForecast>
                </LaterForecast>
              ) : null}
            </div>
          ))}
        </WeatherInfo>
        <IconContext.Provider
          value={{
            color: "white",
            size: "200",
          }}
        >
          <WeatherIconWrapper>
            <WeatherIcon>
              <Sun />
            </WeatherIcon>
          </WeatherIconWrapper>
        </IconContext.Provider>
      </MainInfo>
    </Wrapper>
  );
};

export default Weather;
