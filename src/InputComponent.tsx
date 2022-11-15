import React, { useEffect, useRef } from "react";
import { Input } from "./MainPage/MainPage.styles";
import { InputType } from "./models";

const InputComponent: React.FC<InputType> = ({
  formValues,
  handleInputChange,
  onClose,
  open,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!inputRef.current || !open) return;

      if ((e.target as HTMLElement).contains(inputRef.current)) {
        onClose();
      }
    });
  }, [inputRef.current]);

  return (
    <Input
      // @ts-ignore
      ref={inputRef}
      type="search"
      autoFocus
      id="location"
      name="location"
      placeholder="Search"
      value={formValues.location}
      onChange={handleInputChange}
      required
    />
  );
};

export default InputComponent;
