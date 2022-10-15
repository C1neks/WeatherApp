import React, { useState } from "react";
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

const MainPage = () => {
  const [formValues, setFormValues] = useState(initialFormState);

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
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

        <Link to={"/forecast/" + `${formValues.location}`}>
          <Button>Check Weather</Button>
        </Link>
      </InputButtonWrapper>
    </MainPageWrapper>
  );
};

export default MainPage;
