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

export default FormInput;
