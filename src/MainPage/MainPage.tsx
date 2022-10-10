import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialFormState = {
  location: "",
};

const MainPage = () => {
  const [formValues, setFormValues] = useState<any>(initialFormState);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    console.log(formValues);
  };
  return (
    <>
      <div>MAIN PAGE!</div>
      <div>
        <label htmlFor="location"></label>
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
