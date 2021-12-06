import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import Loader from './components/Loader';
import { loadUser } from './services/users';

const PrivateRoute: React.FC = ({ children }) => {
  const { data, isLoading } = useQuery('me', loadUser);

  if (isLoading) return <Loader />;

  return data && data.user ? <>{children}</> : <Navigate to='/login' />;
};

export default PrivateRoute;
