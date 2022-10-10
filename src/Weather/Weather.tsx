import React, { useEffect, useState } from "react";
const API_KEY = process.env.REACT_APP_API_KEY;

const Weather = () => {
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
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/warsaw?unitGroup=metric&include=days%2Chours&key=${API_KEY}&contentType=json`
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
    <>
      <div>{forecast.resolvedAddress}</div>
      <div>{today.toDateString()}</div>
      <div>{forecast.address}</div>
      {forecast.days.map((x: any, i: number) => (
        <div key={x.datetimeEpoch}>
          {i === 0 ? (
            <div>
              <h3>Data {x.datetime}</h3>
              <h4>Actual Temperature {x.temp}</h4>
              <h4>Max Temperature {x.tempmax}</h4>
              <h4>Min Temperature {x.tempmin}</h4>
              <h4>{x.conditions}</h4>
              <h4>Feels like {x.feelslike}</h4>
              <h4>{x.icon}</h4>
              <p>Sunrise: {x.sunrise}</p> <p>Sunset: {x.sunset}</p>{" "}
              <p>humidity: {x.humidity}</p> <p>{x.windspeed + "km/h"}</p>{" "}
              <p>Precipitation: {x.precipprob}</p> <p>Pressure: {x.pressure}</p>
              {x.hours.map((hour: any) => (
                <div key={hour.datetime}>
                  <p>
                    {hour.datetime >= time
                      ? hour.datetime + " " + hour.temp
                      : null}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h3>Data {x.datetime}</h3>
              <h4>{x.icon}</h4>
              <p>{x.precipprob}</p>
              <h4>Max Temperature {x.tempmax}</h4>
              <h4>Min Temperature {x.tempmin}</h4>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Weather;