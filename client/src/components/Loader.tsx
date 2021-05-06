import './Loader.css';

const Loader: React.FC<{ info?: string }> = ({ info }) => {
  return (
    <div className='loader'>
      <div>
        <h1 style={{ textDecoration: 'underline' }}>
          <i className='fas fa-map-marked-alt'></i>
          trave<span style={{ color: 'green' }}>l-l</span>ogs.
        </h1>
        <div className='spinner'></div>
        <small>{info ? info : 'Please wait'}</small>
      </div>
    </div>
  );
};

export default Loader;
