import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import './Header.css';
import useMeQuery from '../hooks/queries/useMeQuery';

const Header = () => {
  const queryClient = useQueryClient();
  const { data } = useMeQuery();

  return (
    <header>
      <div className='container'>
        <Link className='logo' to='/'>
          <h1>
            <i className='fas fa-map-marked-alt'></i>
            trave<span style={{ color: 'yellow' }}>l-l</span>ogs.
          </h1>
        </Link>
        <nav>
          {data && !data.user ? (
            <ul>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to='/my-logs-map'>
                  <i className='fas fa-route'></i>
                  My logs
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem('jwt');
                    queryClient.invalidateQueries('me');
                  }}
                >
                  <i className='fas fa-sign-out-alt'></i>
                  Logout
                </button>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
