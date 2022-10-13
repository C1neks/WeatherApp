import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCelsiusLine } from "react-icons/ri";

import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import {
  ActualTemp,
  Conditions,
  Degree,
  Details,
  FeelsLike,
  ForecastLocation,
  HighestAndLowest,
  HourForecast,
  HourForecastWrapper,
  MainInfo,
  MoreDetails,
  StyledHours,
  Sun,
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
                              <span>
                                {hour.temp.toFixed(0)}
                                <span>&#176;</span>
                              </span>
                            </HourForecast>
                          }
                        </>
                      ) : null
                    )}
                  </HourForecastWrapper>
                  <MoreDetails>
                    <Details>
                      <p>Sunrise</p> <p>{x.sunrise}</p>
                    </Details>
                    <Details>
                      <p>Sunset</p> <p>{x.sunset}</p>
                    </Details>
                    <Details>
                      <p>Humidity</p> <p>{x.humidity}</p>
                    </Details>
                    <Details>
                      <p>Wind</p>
                      <p>{x.windspeed + "km/h"}</p>
                    </Details>{" "}
                    <Details>
                      <p>Precipitation</p> <p>{x.precipprob + "%"}</p>
                    </Details>{" "}
                    <Details>
                      <p>Pressure</p> <p>{x.pressure.toFixed(0) + " hPa"}</p>
                    </Details>
                  </MoreDetails>
                </div>
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
