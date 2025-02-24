import PropTypes from "prop-types";

const FormInput = ({ label, type, name, value, onChange, required, min }) => (
  <div className="form-group">
    <label>{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
    />
  </div>
);

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number", "email", "password"]).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FormInput.defaultProps = {
  required: false,
  min: undefined,
};

export default FormInput;
