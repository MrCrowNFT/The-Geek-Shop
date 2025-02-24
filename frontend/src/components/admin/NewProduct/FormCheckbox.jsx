import PropTypes from "prop-types";

const FormCheckbox = ({ label, checked, onChange, name }) => (
  <div className="form-group checkbox-group">
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
      />
      {label}
    </label>
  </div>
);

FormCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default FormCheckbox;