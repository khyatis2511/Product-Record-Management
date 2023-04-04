/* eslint-disable react/prop-types */
const InputBox = ({
  children, errorMsg, id, fieldName,
}) => (
  <div>
    {fieldName && (
    <label htmlFor={id}>{fieldName}</label>
    )}
    {children}
    {errorMsg && (
    <span>{errorMsg}</span>
    )}
  </div>
);

export default InputBox;
