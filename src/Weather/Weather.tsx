import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RiCelsiusLine } from "react-icons/ri";

import {
  ActualTemp,
  ChevronDown,
  ChevronUp,
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
  StyledDegree,
  StyledHours,
  TodayForecastDetails,
  TopInfo,
  WeatherIconWrapper,
  WeatherInfo,
  WeekDayWrapper,
  WeekForecastWrapper,
  WrapperDefault,
  WrapperCloud,
  WrapperRain,
  WrapperSun,
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
import Modal from "../Modal/Modal";
import weatherIconGenerator from "./weatherIcon";
import forecastIconGenerator from "./forecastIcon";
import { useWeatherLocation } from "../hooks/useWeatherLocation";
import { getBackgroundWrapper } from "../utils/getBackgroundWrapper";
import { getWeatherForecast } from "../utils/getWeatherForecast";

const initialFormState = {
  location: "",
};

const Weather: React.FC = () => {
  const { loading, cityName } = useWeatherLocation();

  const [isOpen, setIsOpen] = useState(true);
  const [formValues, setFormValues] = useState(initialFormState);
  const [forecast, setForecast] = useState<ForecastType>({
    resolvedAddress: "",
    days: [],
  });
  const [background, setBackground] = useState("");

  const todayDate = new Date();
  const time =
    todayDate.getHours() +
    ":" +
    todayDate.getMinutes() +
    ":" +
    todayDate.getSeconds();

  const onClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    setFormValues((formValues) => ({
      ...formValues,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    (async () => {
      if (!cityName) return;

      setIsOpen(false);
      const result = await getWeatherForecast(cityName);
      const res = await result.json();
      setForecast(res);
      setBackground(res.days[0].icon);
    })();
  }, [cityName]);

  const sixDaysData = forecast.days.slice(1, 7);

  const weekForecast = sixDaysData.map((day: DayType) => (
    <LaterForecast key={day.datetimeEpoch}>
      <WeekDayWrapper>{getWeekDay(day.datetimeEpoch)}</WeekDayWrapper>
      <IconContext.Provider
        value={{
          color: "white",
          size: "25",
        }}
      >
        <IconPercentWrapper>
          {forecastIconGenerator(day.icon)}
          <Precip>{day.precipprob.toFixed(0) + "%"}</Precip>
        </IconPercentWrapper>

        <MaxMinForecast>
          <MaxMinSpan>{day.tempmax.toFixed(0)}</MaxMinSpan>
          <MinSpan>{day.tempmin.toFixed(0)}</MinSpan>
        </MaxMinForecast>
      </IconContext.Provider>
    </LaterForecast>
  ));

  const todayForecastData = forecast.days[0];
  const forecastDetails = todayForecastData && (
    <MoreDetails
      key={todayForecastData.datetimeEpoch}
      day={todayForecastData.icon}
    >
      <Details>
        <DetailName>Sunrise</DetailName>{" "}
        <DetailValue>{todayForecastData.sunrise.slice(0, 5)}</DetailValue>
      </Details>
      <Details>
        <DetailName>Sunset</DetailName>{" "}
        <DetailValue>{todayForecastData.sunset.slice(0, 5)}</DetailValue>
      </Details>
      <Details>
        <DetailName>Humidity</DetailName>{" "}
        <DetailValue>{todayForecastData.humidity.toFixed(0) + "%"}</DetailValue>
      </Details>
      <Details>
        <DetailName>Wind</DetailName>
        <DetailValue>
          {todayForecastData.windspeed.toFixed(0) + "km/h"}
        </DetailValue>
      </Details>{" "}
      <Details>
        <DetailName>Precipitation</DetailName>{" "}
        <DetailValue>
          {todayForecastData.precipprob.toFixed(0) + "%"}
        </DetailValue>
      </Details>{" "}
      <Details>
        <DetailName>Pressure</DetailName>{" "}
        <DetailValue>
          {todayForecastData.pressure.toFixed(0) + " hPa"}
        </DetailValue>
      </Details>
    </MoreDetails>
  );

  const todayForecastDetails = todayForecastData && (
    <div key={todayForecastData.datetimeEpoch}>
      <div>
        <TodayForecastDetails>
          <IconContext.Provider value={{ color: "white", size: "80" }}>
            <ActualTemp>
              {todayForecastData.temp.toFixed(0)}
              <span>&#176;</span>
            </ActualTemp>
          </IconContext.Provider>
          <HighestAndLowest>
            <span>
              <ChevronUp /> {todayForecastData.tempmax.toFixed(0)}
              <span>&#176;</span>
            </span>
            <span>
              <ChevronDown />
              {todayForecastData.tempmin.toFixed(0)}
              <span>&#176;</span>
            </span>
          </HighestAndLowest>

          <Conditions>{todayForecastData.conditions}</Conditions>
          <FeelsLike>
            Feels like {todayForecastData.feelslike.toFixed(0)}{" "}
            <span>&#176;</span>
          </FeelsLike>
        </TodayForecastDetails>

        <HourForecastWrapper>
          {todayForecastData.hours.map((hour: Hour) =>
            hour.datetime >= time ? (
              <div key={hour.datetime}>
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
              </div>
            ) : null
          )}
        </HourForecastWrapper>
      </div>
    </div>
  );

  const mainContent = (
    <>
      <TopInfo background={background}>
        <MainPageWrapper>
          <AppDesc>
            <ModalWrapper>
              {!isOpen ? (
                <OpenModalButton onClick={() => setIsOpen(true)}>
                  <Loop />
                </OpenModalButton>
              ) : null}

              <Modal
                formValues={formValues}
                handleInputChange={handleInputChange}
                open={isOpen}
                onClose={onClose}
              />
            </ModalWrapper>
          </AppDesc>
        </MainPageWrapper>

        <div data-testid="date">{todayDate.toDateString().slice(0, -4)}</div>
        <RiCelsiusLine />
      </TopInfo>

      <MainInfo>
        <WeatherInfo>
          <ForecastLocation>
            {forecast.resolvedAddress === "" ? (
              <span>
                Can't get your location, please use search at the top to enter
                correct location or try again.
              </span>
            ) : null}
            {forecast.resolvedAddress}
          </ForecastLocation>
          {todayForecastDetails}
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
            {weatherIconGenerator(background)}
          </WeatherIconWrapper>
        </IconContext.Provider>
      </MainInfo>
    </>
  );

  const BackgroundWrapper = getBackgroundWrapper(background);

  return (
    <div>
      {loading ? (
        <LoaderContainer>
          <Spinner />
        </LoaderContainer>
      ) : (
        <BackgroundWrapper>{mainContent}</BackgroundWrapper>
      )}
    </div>
  );
};

export default Weather;
