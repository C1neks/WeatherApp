import React from "react";
import { Input } from "./MainPage/MainPage.styles";

const InputComponent = ({
  formValues,
  handleInputChange,
}: {
  formValues: any;
  handleInputChange: any;
}) => {
  return (
    <div>
      <Input
        type="text"
        autoFocus
        id="location"
        name="location"
        placeholder="Enter location"
        value={formValues.location}
        onChange={handleInputChange}
        required
      />
    </div>
  );
};

export default InputComponent;
