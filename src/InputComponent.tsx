import React from "react";
import { Input } from "./MainPage/MainPage.styles";

const InputComponent = ({
  formValues,
  handleInputChange,
  onClose,
}: {
  formValues: { location: string };
  handleInputChange: (e: any) => void;
  onClose: () => void;
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
        onBlur={onClose}
        required
      />
    </div>
  );
};

export default InputComponent;
