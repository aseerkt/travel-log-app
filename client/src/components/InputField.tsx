import { useField } from 'formik';
import './InputField.css';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  children,
  label,
  textarea = false,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  const propsToSpread = {
    type: props.type,
    placeholder: props.placeholder,
    className: props.className,
    autoComplete: props.autoComplete,
    min: props.min,
    max: props.max,
  };

  return (
    <div className='form-control'>
      <label className='label' htmlFor={field.name}>
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={4}
          {...propsToSpread}
          id={field.name}
          {...field}
        ></textarea>
      ) : (
        <input id={field.name} {...propsToSpread} {...field} />
      )}
      <small></small>
      {touched && error && <small className='errorText'>{error}</small>}
    </div>
  );
};

export default InputField;
