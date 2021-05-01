import './FormWrapper.css';

type FormWrapperProps = {
  title: string;
  subTitle?: string;
};

const FormWrapper: React.FC<FormWrapperProps> = ({
  title,
  subTitle,
  children,
}) => {
  return (
    <div className='form-wrapper'>
      <h2>{title}</h2>
      <small>{subTitle}</small>
      {children}
    </div>
  );
};

export default FormWrapper;
