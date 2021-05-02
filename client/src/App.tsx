import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Layout from './components/Layout';
// Page Components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MapPage from './pages/MapPage';
import LogsPage from './pages/LogsPage';
import LogPage from './pages/LogPage';
import ProfilePage from './pages/ProfilePage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Switch>
              <Route exact path='/' component={LogsPage} />
              <Route exact path='/logs/:id' component={LogPage} />
              <Route exact path='/login' component={LoginPage} />
              <PrivateRoute exact path='/my-logs-map' component={MapPage} />
              <Route exact path='/u/:userId' component={ProfilePage} />
              <Route exact path='/register' component={RegisterPage} />
            </Switch>
            <ReactQueryDevtools initialIsOpen />
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
