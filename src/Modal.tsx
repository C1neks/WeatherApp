import React from "react";
import { InputButton, InputButtonWrapper } from "./MainPage/MainPage.styles";

import InputComponent from "./InputComponent";
import {
  Form,
  LocationButton,
  LocationIcon,
  ModalContainer,
  SearchBarLoop,
  SubmitButton,
} from "./Weather/Weather.styles";
import { ModalType } from "./models";

const Modal: React.FC<ModalType> = ({
  open,
  onClose,
  formValues,
  handleInputChange,
  getWeatherForecast,
  getDeviceLocation,
}) => {
  if (!open) return null;

  return (
    <ModalContainer>
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
            <LocationIcon />
          </LocationButton>
        </InputButton>
      </InputButtonWrapper>
    </ModalContainer>
  );
};

export default Modal;
