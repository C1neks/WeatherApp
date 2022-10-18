import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCelsiusLine } from "react-icons/ri";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

// import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import {
  ActualTemp,
  ChevronDown,
  ChevronUp,
  Cloud,
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
  MinSpan,
  MoreDetails,
  Precip,
  Rain,
  StyledDegree,
  StyledHours,
  Sun,
  TodayForecastDetails,
  TopInfo,
  WeatherForecastIcon,
  WeatherIcon,
  WeatherIconWrapper,
  WeatherInfo,
  WeekDayWrapper,
  Wrapper,
  WrapperCloud,
  WrapperRain,
} from "./Weather.styles";
import { IconContext } from "react-icons";
import { DayType, ForecastType, Hour } from "../models";
import getWeekDay from "./getWeekDay";
const API_KEY = process.env.REACT_APP_API_KEY;
const GLE_API_KEY = process.env.REACT_APP_GOOGLE;

const Weather: React.FC = () => {
  let { locationID } = useParams();
  const timeElapsed = Date.now();

  const today = new Date(timeElapsed);

  const todayDate = new Date();
  const time =
    todayDate.getHours() +
    ":" +
    todayDate.getMinutes() +
    ":" +
    todayDate.getSeconds();

  const [forecast, setForecast] = useState<ForecastType>({
    address: "",
    days: [],
  });
  const [background, setBackground] = useState<DayType>({
    conditions: "",
    datetimeEpoch: 0,
    feelslike: 0,
    hours: [],
    humidity: 0,
    precipprob: 0,
    pressure: 0,
    sunrise: "",
    sunset: "",
    temp: 0,
    tempmax: 0,
    tempmin: 0,
    windspeed: 0,
    icon: "",
  });

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
      setBackground(result.days[0]);
    })();
  }, []);

  // @ts-ignore
  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

  const forecastDetails = forecast.days.map((day: DayType, i: number) =>
    i === 0 ? (
      <MoreDetails day={day.icon}>
        <Details>
          <DetailName>Sunrise</DetailName>{" "}
          <DetailValue>{day.sunrise.slice(0, 5)}</DetailValue>
        </Details>
        <Details>
          <DetailName>Sunset</DetailName>{" "}
          <DetailValue>{day.sunset.slice(0, 5)}</DetailValue>
        </Details>
        <Details>
          <DetailName>Humidity</DetailName>{" "}
          <DetailValue>{day.humidity.toFixed(0) + "%"}</DetailValue>
        </Details>
        <Details>
          <DetailName>Wind</DetailName>
          <DetailValue>{day.windspeed.toFixed(0) + "km/h"}</DetailValue>
        </Details>{" "}
        <Details>
          <DetailName>Precipitation</DetailName>{" "}
          <DetailValue>{day.precipprob.toFixed(0) + "%"}</DetailValue>
        </Details>{" "}
        <Details>
          <DetailName>Pressure</DetailName>{" "}
          <DetailValue>{day.pressure.toFixed(0) + " hPa"}</DetailValue>
        </Details>
      </MoreDetails>
    ) : null
  );

  return (
    <ConditionalWrapper
      condition={background.icon}
      wrapper={(
        children:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined
      ) =>
        background.icon.includes("rain") ? (
          <WrapperRain>{children}</WrapperRain>
        ) : background.icon.includes("sunny") ? (
          <Wrapper>{children}</Wrapper>
        ) : (
          <WrapperCloud>{children}</WrapperCloud>
        )
      }
    >
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
          {forecast.days.map((day: DayType, i: number) => (
            <div key={day.datetimeEpoch}>
              {i === 0 ? (
                <div>
                  <TodayForecastDetails>
                    <IconContext.Provider
                      value={{ color: "white", size: "80" }}
                    >
                      <ActualTemp>
                        {day.temp.toFixed(0)}
                        <span>&#176;</span>
                      </ActualTemp>
                    </IconContext.Provider>
                    <HighestAndLowest>
                      <span>
                        <ChevronUp /> {day.tempmax.toFixed(0)}
                        <span>&#176;</span>
                      </span>
                      <span>
                        <ChevronDown />
                        {day.tempmin.toFixed(0)}
                        <span>&#176;</span>
                      </span>
                    </HighestAndLowest>

                    <Conditions>{day.conditions}</Conditions>
                    <FeelsLike>
                      Feels like {day.feelslike.toFixed(0)} <span>&#176;</span>
                    </FeelsLike>
                    {/*<h4>{x.icon}</h4>*/}
                  </TodayForecastDetails>
                  <HourForecastWrapper>
                    {day.hours.map((hour: Hour, i: number) =>
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
                </div>
              ) : i > 0 && i <= 6 ? (
                <LaterForecast>
                  <WeekDayWrapper>
                    {getWeekDay(day.datetimeEpoch)}
                  </WeekDayWrapper>
                  <IconContext.Provider
                    value={{
                      color: "white",
                      size: "25",
                    }}
                  >
                    {day.icon === "rain" ? (
                      <WeatherForecastIcon>
                        <WiRain />
                      </WeatherForecastIcon>
                    ) : day.icon === "partly-cloudy-day" ? (
                      <WeatherForecastIcon>
                        <WiCloud />
                      </WeatherForecastIcon>
                    ) : (
                      <WeatherForecastIcon>
                        <WiDaySunny />
                      </WeatherForecastIcon>
                    )}
                    <Precip>{day.precipprob.toFixed(0) + "%"}</Precip>
                    <MaxMinForecast>
                      <MaxMinSpan>{day.tempmax.toFixed(0)}</MaxMinSpan>
                      <MinSpan>{day.tempmin.toFixed(0)}</MinSpan>
                    </MaxMinForecast>
                  </IconContext.Provider>
                </LaterForecast>
              ) : null}
            </div>
          ))}
          {forecastDetails}
        </WeatherInfo>
        <IconContext.Provider
          value={{
            color: "white",
            size: "200",
          }}
        >
          <WeatherIconWrapper>
            <WeatherIcon>
              {background.icon.includes("rain") ? (
                <Rain />
              ) : background.icon.includes("sunny") ? (
                <Sun />
              ) : (
                <Cloud />
              )}
            </WeatherIcon>
          </WeatherIconWrapper>
        </IconContext.Provider>
      </MainInfo>
    </ConditionalWrapper>
  );
};

export default Weather;
