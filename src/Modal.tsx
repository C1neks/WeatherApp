import React from "react";
import {
  Button,
  InputButton,
  InputButtonWrapper,
} from "./MainPage/MainPage.styles";

import InputComponent from "./InputComponent";
import {
  Close,
  CloseModalButton,
  ModalWrapper,
} from "./Weather/Weather.styles";

const Modal = ({
  open,
  onClose,
  formValues,
  handleInputChange,
  getWeatherForecast,
}: {
  open: boolean;
  onClose: any;
  formValues: any;
  deviceLocation: string;
  handleInputChange: any;
  getWeatherForecast: any;
}) => {
  if (!open) return null;

  return (
    <ModalWrapper>
      <InputButtonWrapper>
        <InputButton>
          <label htmlFor="location" />
          <InputComponent
            formValues={formValues}
            handleInputChange={handleInputChange}
          />
          <CloseModalButton onClick={onClose}>
            <Close />
          </CloseModalButton>
        </InputButton>

        {formValues.location === "" ? null : (
          <Button onClick={getWeatherForecast}>Check Weather</Button>
        )}
      </InputButtonWrapper>
    </ModalWrapper>
  );
};

export default Modal;
