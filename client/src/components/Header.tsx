import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import './Header.css';
import useMeQuery from '../hooks/queries/useMeQuery';
import axios from 'axios';

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
                <Link to='/login'>
                  <i className='fas fa-user'></i>
                  Login
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <i className='fas fa-user-plus'></i>
                  Register
                </Link>
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
                    axios.defaults.headers = {
                      'Content-Type': 'application/json',
                    };
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
