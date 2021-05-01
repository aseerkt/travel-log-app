import { FieldHookConfig, useField } from 'formik';
import './InputField.css';

type InputFieldProps = FieldHookConfig<''> & {
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
    id: props.id,
    key: props.key,
    type: props.type,
    placeholder: props.placeholder,
    className: props.className,
    autoComplete: props.autoComplete,
  };

  return (
    <div className='form-control'>
      <label className='label' htmlFor={field.name}>
        {label}
      </label>
      {textarea ? (
        <textarea rows={4} {...propsToSpread} {...field}></textarea>
      ) : (
        <input {...propsToSpread} {...field} />
      )}
      <small></small>
      {touched && error && <small className='errorText'>{error}</small>}
    </div>
  );
};

export default InputField;
