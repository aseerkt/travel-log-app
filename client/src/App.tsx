import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Switch>
              <Route exact path='/' component={MapPage} />
              <Route exact path='/login' component={LoginPage} />
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
