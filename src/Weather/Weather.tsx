import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { RiCelsiusLine } from "react-icons/ri";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

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
  WeatherForecastIcon,
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
import weatherIconGenerator from "./weatherIcon";
import forecastIconGenerator from "./forecastIcon";

const initialFormState = {
  location: "",
};

const Weather: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [deviceLocation, setDeviceLocation] = useState<string>("");
  const [formValues, setFormValues] = useState(initialFormState);
  const [forecast, setForecast] = useState<ForecastType>({
    resolvedAddress: "",
    days: [],
  });
  const [background, setBackground] = useState<string>("");

  const timeElapsed = Date.now();

  const today = new Date(timeElapsed);

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
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const getDeviceLocation = async () => {
    const param = searchParams.get("name");
    if (param) {
      setDeviceLocation(param);
    } else {
      setLoading(true);

      navigator.geolocation.getCurrentPosition(async function (position) {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GOOGLE}`
        );
        setLoading(false);
        const devLoc = await res.json();
        setDeviceLocation(devLoc.plus_code.compound_code.slice(9));
      });
    }
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
      if (deviceLocation !== "") {
        navigate({ pathname: "/city", search: `?name=${deviceLocation}` });
      }
    })();
  }, [deviceLocation]);

  const getWeatherForecast = async () => {
    setIsOpen(false);
    if (deviceLocation !== "") {
      if (formValues.location !== "") {
        setDeviceLocation(formValues.location);
      }

      const result = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${deviceLocation}?unitGroup=metric&include=days%2Chours&key=${process.env.REACT_APP_API_KEY}&contentType=json`
      );
      const res = await result.json();
      setForecast(res);
      setBackground(res.days[0].icon);
    } else {
      if (formValues.location !== "") {
        navigate({ pathname: "/city", search: `?name=${formValues.location}` });
        const result = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formValues.location}?unitGroup=metric&include=days%2Chours&key=${process.env.REACT_APP_API_KEY}&contentType=json`
        );
        const res = await result.json();
        setForecast(res);
        setBackground(res.days[0].icon);
      }
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
    ) : null
  );

  const forecastDetails = forecast.days.map((day: DayType, i: number) =>
    i === 0 ? (
      <MoreDetails key={day.datetimeEpoch} day={day.icon}>
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

  const todayForecastDetails = forecast.days.map((day: DayType, i: number) => (
    <div key={day.datetimeEpoch}>
      {i === 0 ? (
        <div>
          <TodayForecastDetails>
            <IconContext.Provider value={{ color: "white", size: "80" }}>
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
          </TodayForecastDetails>

          <HourForecastWrapper>
            {day.hours.map((hour: Hour, i: number) =>
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
      ) : null}
    </div>
  ));

  return (
    <div>
      {loading ? (
        <LoaderContainer>
          <Spinner />
        </LoaderContainer>
      ) : (
        <ConditionalWrapper
          condition={background}
          wrapper={(children) =>
            background.includes("rain") ? (
              <WrapperRain>{children}</WrapperRain>
            ) : background.includes("sun") ? (
              <Wrapper background={background}>{children}</Wrapper>
            ) : background.includes("cloud") ? (
              <WrapperCloud>{children}</WrapperCloud>
            ) : (
              <Wrapper background={background}>{children}</Wrapper>
            )
          }
        >
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
                    deviceLocation={deviceLocation}
                    handleInputChange={handleInputChange}
                    open={isOpen}
                    onClose={onClose}
                    getWeatherForecast={getWeatherForecast}
                    getDeviceLocation={getDeviceLocation}
                  />
                </ModalWrapper>
              </AppDesc>
            </MainPageWrapper>

            <div>{today.toDateString().slice(0, -4)}</div>
            <RiCelsiusLine />
          </TopInfo>

          <MainInfo>
            <WeatherInfo>
              <ForecastLocation>
                {forecast.resolvedAddress === "" ? (
                  <span>
                    Can't get your location, please use search at the top to
                    enter correct location or try again.
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
        </ConditionalWrapper>
      )}
    </div>
  );
};

export default Weather;
