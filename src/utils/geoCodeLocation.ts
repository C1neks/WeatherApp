export const geoCodeLocation = async (latitude: number, longitude: number) => {
  const result = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE}`
  );

  return result;
};
