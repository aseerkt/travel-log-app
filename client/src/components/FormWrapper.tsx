import { Link } from 'react-router-dom';
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
      <Link className='logo' to='/'>
        <h1>
          <i className='fas fa-map-marked-alt'></i>
          trave<span style={{ color: 'green' }}>l-l</span>ogs.
        </h1>
      </Link>
      <h2>{title}</h2>
      <small>{subTitle}</small>
      {children}
    </div>
  );
};

export default FormWrapper;
