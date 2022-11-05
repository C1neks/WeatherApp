import React from "react";
import { Input } from "./MainPage/MainPage.styles";
import { InputType } from "./models";

const InputComponent: React.FC<InputType> = ({
  formValues,
  handleInputChange,
  onClose,
}) => {
  return (
    <Input
      type="search"
      autoFocus
      id="location"
      name="location"
      placeholder="Search"
      value={formValues.location}
      onChange={handleInputChange}
      onBlur={onClose}
      required
    />
  );
};

export default InputComponent;
