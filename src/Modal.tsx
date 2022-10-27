import React from "react";
import { InputButton, InputButtonWrapper } from "./MainPage/MainPage.styles";

import InputComponent from "./InputComponent";
import {
  Form,
  LocationButton,
  LocationIcon,
  ModalWrapper,
  SearchBarLoop,
  SubmitButton,
} from "./Weather/Weather.styles";

const Modal = ({
  open,
  onClose,
  formValues,
  handleInputChange,
  getWeatherForecast,
  getDeviceLocation,
}: {
  open: boolean;
  onClose: () => void;
  formValues: { location: string };
  deviceLocation: string;
  handleInputChange: (e: any) => void;
  getWeatherForecast: () => void;
  getDeviceLocation: () => void;
}) => {
  if (!open) return null;

  return (
    <ModalWrapper>
      <InputButtonWrapper>
        <InputButton>
          <Form onSubmit={getWeatherForecast}>
            <InputComponent
              formValues={formValues}
              handleInputChange={handleInputChange}
              onClose={onClose}
            />
            <SubmitButton type="submit" onMouseDown={getWeatherForecast}>
              <SearchBarLoop />
            </SubmitButton>
          </Form>
          <LocationButton onMouseDown={getDeviceLocation}>
            <LocationIcon></LocationIcon>
          </LocationButton>
        </InputButton>
      </InputButtonWrapper>
    </ModalWrapper>
  );
};

export default Modal;
