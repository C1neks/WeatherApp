import React from "react";
import {
  Button,
  Input,
  InputButton,
  InputButtonWrapper,
} from "./MainPage/MainPage.styles";
import { Link } from "react-router-dom";

const Modal = ({
  open,
  children,
  onClose,
  formValues,
  deviceLocation,
  handleInputChange,
}: {
  children: any;
  open: boolean;
  onClose: any;
  formValues: any;
  deviceLocation: string;
  handleInputChange: any;
}) => {
  if (!open) return null;

  return (
    <div>
      {" "}
      <button onClick={onClose}>X</button>
      <InputButtonWrapper>
        <InputButton deviceLocation={deviceLocation}>
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
        </InputButton>

        {formValues.location === "" ? null : (
          <Link to={"/forecast/" + `${formValues.location}`}>
            <Button>Check Weather</Button>
          </Link>
        )}
      </InputButtonWrapper>
      {children}
    </div>
  );
};

export default Modal;
