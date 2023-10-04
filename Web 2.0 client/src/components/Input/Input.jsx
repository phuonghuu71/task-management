import PropTypes from "prop-types";

function Input({ placeholder, input, setInput, inputRef, onChange }) {
  return (
    <div className="input flex-1">
      <label
        data-test={`input-${placeholder?.toLowerCase()}-label`}
        className={`input__label ${input?.isActive ? "active" : ""}`}
        htmlFor={`input-${placeholder?.toLowerCase()}`}
      >
        {placeholder || "Input..."}
      </label>
      <input
        data-test={`input-${placeholder?.toLowerCase()}`}
        className="input__input"
        type="text"
        name={`input-${placeholder?.toLowerCase()}`}
        ref={inputRef}
        value={input?.value}
        id=""
        onFocus={() =>
          setInput({
            ...input,
            isActive: true,
          })
        }
        onChange={onChange}
        onBlur={() => {
          if (input?.value === "") {
            setInput({
              ...input,
              isActive: false,
            });
          }
        }}
      />
    </div>
  );
}

Input.propTypes = {
  input: PropTypes.object,
  setInput: PropTypes.func,
  placeholder: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  onChange: PropTypes.func,
};

export default Input;
