import React from "react";
import { Input } from "./MainPage/MainPage.styles";

const InputComponent = ({
  formValues,
  handleInputChange,
}: {
  formValues: { location: string };
  handleInputChange: (e: any) => void;
}) => {
  return (
    <div>
      <Input
        type="search"
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
