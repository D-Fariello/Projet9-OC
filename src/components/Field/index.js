import { useState } from "react";
import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

const Field = ({
  type = FIELD_TYPES.INPUT_TEXT,
  label,
  name,
  placeholder,
  required,
  errorMessage = "This field is required",
  value = "", // Accept value prop
  onChange // Accept onChange prop
}) => {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    onChange(e); 
    if (required && !e.target.value) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };


  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          data-testid="field-testid"
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          data-testid="field-testid"
        />
      );
      break;
    default:
      component = (
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          data-testid="field-testid"
        />
      );
  }
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  value: PropTypes.string, // Add value to propTypes
  onChange: PropTypes.func, // Add onChange to propTypes
};
 Field.defaultProps = {
   label: "",
   placeholder: "",
   type: FIELD_TYPES.INPUT_TEXT,
   name: "field-name",
   required: true,
   errorMessage: "This field is required",
   value: "", // Default value as an empty string
   onChange: () => {}, // Default onChange as a no-op function
 }

export default Field;
