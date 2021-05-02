import { useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { loadUser } from '../services/users';
import './Header.css';

const Header = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery('me', loadUser);

  return (
    <header>
      <div className='container'>
        <Link className='logo' to='/'>
          <h1>travel-log.</h1>
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
                <a
                  href='#'
                  onClick={() => {
                    localStorage.removeItem('jwt');
                    queryClient.invalidateQueries('me');
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
