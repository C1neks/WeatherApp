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
  TryAgainButton,
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
          <form onSubmit={getWeatherForecast}>
            <label htmlFor="location" />
            <InputComponent
              formValues={formValues}
              handleInputChange={handleInputChange}
            />

            <button type="button"></button>
          </form>

          <TryAgainButton onClick={getDeviceLocation}>Try Again</TryAgainButton>
        </InputButton>
      </InputButtonWrapper>
    </ModalWrapper>
  );
};

export default Modal;
