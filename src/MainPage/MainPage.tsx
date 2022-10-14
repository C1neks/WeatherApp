import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialFormState = {
  location: "",
};

const MainPage = () => {
  const [formValues, setFormValues] = useState(initialFormState);

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div>MAIN PAGE!</div>
      <div>
        <label htmlFor="location" />
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Check weather..."
          value={formValues.location}
          onChange={handleInputChange}
          required
        />
      </div>

      <Link to={"/forecast/" + `${formValues.location}`}>
        <button>Check Weather</button>
      </Link>
    </>
  );
};

export default MainPage;
