import React from "react";
import { InputButton, InputButtonWrapper } from "../MainPage/MainPage.styles";

import InputComponent from "../InputComponent";
import {
  Form,
  LocationButton,
  LocationIcon,
  ModalContainer,
  SearchBarLoop,
  SubmitButton,
} from "../Weather/Weather.styles";
import { ModalType } from "../models";
import { useNavigate } from "react-router-dom";

const Modal: React.FC<ModalType> = ({
  open,
  onClose,
  formValues,
  handleInputChange,
}) => {
  const navigate = useNavigate();
  if (!open) return null;

  const setCityParam = (e: any) => {
    e.preventDefault();
    console.log(formValues.location);
    navigate({ pathname: "/city", search: `?name=${formValues.location}` });
  };

  return (
    <ModalContainer>
      <InputButtonWrapper>
        <InputButton>
          <Form onSubmit={setCityParam}>
            <InputComponent
              open={open}
              formValues={formValues}
              handleInputChange={handleInputChange}
              onClose={onClose}
            />
            <SubmitButton type="submit">
              <SearchBarLoop />
            </SubmitButton>
          </Form>
          <LocationButton onMouseDown={() => navigate({ pathname: "/city" })}>
            <LocationIcon />
          </LocationButton>
        </InputButton>
      </InputButtonWrapper>
    </ModalContainer>
  );
};

export default Modal;
