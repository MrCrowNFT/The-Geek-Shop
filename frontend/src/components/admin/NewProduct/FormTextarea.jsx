const FormTextarea = ({ label, name, value, onChange }) => (
  <div className="form-group">
    <label>{label}:</label>
    <textarea name={name} value={value} onChange={onChange} />
  </div>
);

export default FormTextarea;
