import axios from 'axios';
import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Layout from './components/Layout';
import { API_URL } from './config';
import Loader from './components/Loader';
// Page Components
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const MapPage = lazy(() => import('./pages/MapPage'));
const LogsPage = lazy(() => import('./pages/LogsPage'));
const LogPage = lazy(() => import('./pages/LogPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AddLogPage = lazy(() => import('./pages/AddLogPage'));

axios.defaults.baseURL = `${API_URL}/api`;
axios.defaults.headers = {
  'Content-Type': 'application/json',
  authorization: `Bearer ${localStorage.getItem('jwt')}`,
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Layout>
              <Switch>
                <Route exact path='/' component={LogsPage} />
                <Route exact path='/logs/:id' component={LogPage} />
                <Route exact path='/login' component={LoginPage} />
                <PrivateRoute exact path='/my-logs-map' component={MapPage} />
                <PrivateRoute
                  exact
                  path='/add-log?lat=:latitude&long=:longitude'
                  component={AddLogPage}
                />
                <Route exact path='/u/:userId' component={ProfilePage} />
                <Route exact path='/register' component={RegisterPage} />
              </Switch>
              <ReactQueryDevtools initialIsOpen />
            </Layout>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
