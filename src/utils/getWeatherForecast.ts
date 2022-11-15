export const getWeatherForecast = async (cityName: string) => {
  const result = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&include=days%2Chours&key=${process.env.REACT_APP_API_KEY}&contentType=json`
  );

  return result;
};
