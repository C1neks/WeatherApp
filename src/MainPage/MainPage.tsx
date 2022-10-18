import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppDesc,
  AppName,
  Button,
  Input,
  InputButtonWrapper,
  MainPageWrapper,
} from "./MainPage.styles";

const initialFormState = {
  location: "",
};
const GLE_API_KEY = process.env.REACT_APP_GOOGLE;

const MainPage = () => {
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

  const getDeviceLocation = async () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
      console.log("1");
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${GLE_API_KEY}`
      );
      console.log("5");
      const devLoc = await res.json();
      console.log(devLoc.plus_code.compound_code.slice(9));
      setDeviceLocation(devLoc.plus_code.compound_code.slice(9));
    });
  };

  useEffect(() => {
    (async () => {
      await getDeviceLocation();
    })();
  }, []);

  return (
    <MainPageWrapper>
      <AppName>Weather App</AppName>
      <AppDesc>Enter location for weather forecast </AppDesc>
      <InputButtonWrapper>
        <div>
          <label htmlFor="location" />
          <Input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={formValues.location}
            onChange={handleInputChange}
            required
          />
        </div>
        {deviceLocation === "" ? (
          <Link to={"/forecast/" + `${formValues.location}`}>
            <Button>Check Weather</Button>
          </Link>
        ) : (
          <Link to={"/forecast/" + `${deviceLocation}`}>
            <Button>Check Weather</Button>
          </Link>
        )}
      </InputButtonWrapper>
    </MainPageWrapper>
  );
};

export default MainPage;
