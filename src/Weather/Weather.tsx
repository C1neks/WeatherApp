import React, { useEffect, useState } from "react";

const Weather = () => {
  const timeElapsed = Date.now();
  const today: any = new Date(timeElapsed);
  const [forecast, setForecast] = useState<any>({ days: [] });
  const getWeatherForecast = async () => {
    const result = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/bialystok?unitGroup=metric&include=days&key=AKX659CKNYKH48BPCZETG9YZ8&contentType=json"
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

      {forecast.days.map((x: any) => (
        <div>
          <h3>Data {x.datetime}</h3>
          <h4>Actual Temperature {x.temp}</h4>
          <h4>Feels like {x.feelslike}</h4>
          <h4>{x.conditions}</h4>
          <h4>Max Temperature {x.tempmax}</h4>
          <h4>Min Temperature {x.tempmin}</h4>
          <p>{x.preciptype + ":" + x.precipprob}</p>
          <p>Description: {x.description}</p>
        </div>
      ))}
    </>
  );
};

export default Weather;
