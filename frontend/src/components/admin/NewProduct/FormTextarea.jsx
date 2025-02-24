import PropTypes from "prop-types";

const FormTextarea = ({ label, name, value, onChange }) => (
  <div className="form-group">
    <label>{label}:</label>
    <textarea name={name} value={value} onChange={onChange} />
  </div>
);

FormTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormTextarea;
