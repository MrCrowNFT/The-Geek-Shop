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

export default FormCheckbox;
