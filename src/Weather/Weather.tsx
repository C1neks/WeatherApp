import React, { ReactElement, useEffect, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { RiCelsiusLine } from "react-icons/ri";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

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
  IconPercentWrapper,
  LaterForecast,
  Loop,
  MainInfo,
  MaxMinForecast,
  MaxMinSpan,
  MinSpan,
  ModalWrapper,
  MoreDetails,
  OpenModalButton,
  Precip,
  Rain,
  Sad,
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
  WeekForecastWrapper,
  Wrapper,
  WrapperCloud,
  WrapperRain,
} from "./Weather.styles";
import { IconContext } from "react-icons";
import { DayType, ForecastType, Hour } from "../models";
import getWeekDay from "./getWeekDay";
import {
  AppDesc,
  LoaderContainer,
  MainPageWrapper,
  Spinner,
} from "../MainPage/MainPage.styles";
import Modal from "../Modal";

const API_KEY = process.env.REACT_APP_API_KEY;
const GLE_API_KEY = process.env.REACT_APP_GOOGLE;
const initialFormState = {
  location: "",
};
const Weather: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [deviceLocation, setDeviceLocation] = useState<string>("");
  const [formValues, setFormValues] = useState(initialFormState);

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

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

  const getDeviceLocation = async () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(async function (position) {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${GLE_API_KEY}`
      );
      setLoading(false);
      const devLoc = await res.json();
      setDeviceLocation(devLoc.plus_code.compound_code.slice(9));
    });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getDeviceLocation();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await getWeatherForecast();
    })();
  }, [deviceLocation]);

  const getWeatherForecast = async () => {
    if (deviceLocation !== "") {
      const result = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${deviceLocation}?unitGroup=metric&include=days%2Chours&key=${API_KEY}&contentType=json`
      );
      const res = await result.json();
      setForecast(res);
      setBackground(res.days[0]);
    } else {
      const result = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formValues.location}?unitGroup=metric&include=days%2Chours&key=${API_KEY}&contentType=json`
      );
      const res = await result.json();
      setForecast(res);
      setBackground(res.days[0]);
      setIsOpen(false);
    }
  };

  const ConditionalWrapper = ({
    condition,
    wrapper,
    children,
  }: {
    condition: string;
    children:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
    wrapper: (children: any) => any;
  }) => (condition ? wrapper(children) : children);

  const weekForecast = forecast.days.map((day: DayType, i: number) =>
    i > 0 && i <= 6 ? (
      <LaterForecast>
        <WeekDayWrapper>{getWeekDay(day.datetimeEpoch)}</WeekDayWrapper>
        <IconContext.Provider
          value={{
            color: "white",
            size: "25",
          }}
        >
          <IconPercentWrapper>
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
          </IconPercentWrapper>

          <MaxMinForecast>
            <MaxMinSpan>{day.tempmax.toFixed(0)}</MaxMinSpan>
            <MinSpan>{day.tempmin.toFixed(0)}</MinSpan>
          </MaxMinForecast>
        </IconContext.Provider>
      </LaterForecast>
    ) : null
  );

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
    <>
      {loading ? (
        <LoaderContainer>
          <Spinner />
        </LoaderContainer>
      ) : (
        <ConditionalWrapper
          condition={background.icon}
          wrapper={(children) =>
            background.icon.includes("rain") ? (
              <WrapperRain>{children}</WrapperRain>
            ) : background.icon.includes("sun") ? (
              <Wrapper>{children}</Wrapper>
            ) : background.icon.includes("cloud") ? (
              <WrapperCloud>{children}</WrapperCloud>
            ) : (
              <Wrapper>{children}</Wrapper>
            )
          }
        >
          {deviceLocation === "" ? (
            <MainPageWrapper>
              <AppDesc>
                <>
                  <ModalWrapper>
                    <OpenModalButton onClick={() => setIsOpen(true)}>
                      <Loop />
                    </OpenModalButton>

                    <Modal
                      formValues={formValues}
                      deviceLocation={deviceLocation}
                      handleInputChange={handleInputChange}
                      open={isOpen}
                      onClose={() => setIsOpen(false)}
                      getWeatherForecast={getWeatherForecast}
                      getDeviceLocation={getDeviceLocation}
                    />
                  </ModalWrapper>
                </>
              </AppDesc>
            </MainPageWrapper>
          ) : null}

          <TopInfo background={background.icon}>
            <GiHamburgerMenu />
            <div>{today.toDateString()}</div>
            <RiCelsiusLine />
          </TopInfo>

          <MainInfo>
            <WeatherInfo>
              <ForecastLocation>
                {forecast.address === "" ? (
                  <span>
                    Can't get your location, please use search at the top to
                    enter correct location or try again.
                  </span>
                ) : null}
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
                          Feels like {day.feelslike.toFixed(0)}{" "}
                          <span>&#176;</span>
                        </FeelsLike>
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
                  ) : null}
                </div>
              ))}
              <WeekForecastWrapper>
                {weekForecast}
                {forecastDetails}
              </WeekForecastWrapper>
            </WeatherInfo>
            <IconContext.Provider
              value={{
                color: "white",
                size: "200",
              }}
            >
              <WeatherIconWrapper>
                <WeatherIcon background={background.icon}>
                  {background.icon.includes("rain") ? (
                    <Rain />
                  ) : background.icon.includes("sun") ? (
                    <Sun />
                  ) : background.icon.includes("cloud") ? (
                    <Cloud />
                  ) : background.icon.includes("clear") ? (
                    <Sun />
                  ) : (
                    <Sad />
                  )}
                </WeatherIcon>
              </WeatherIconWrapper>
            </IconContext.Provider>
          </MainInfo>
        </ConditionalWrapper>
      )}
    </>
  );
};

export default Weather;
