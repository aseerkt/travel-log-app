import { useQuery } from 'react-query';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { loadUser } from './services/users';

type PrivateRouteProps = RouteProps & {
  component: React.FC<RouteComponentProps>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { data } = useQuery('me', loadUser);
  return (
    <Route
      {...rest}
      render={(props) =>
        data && data.user ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
