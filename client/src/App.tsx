import axios from 'axios';
import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
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
          <Layout>
            <Routes>
              <Route path='/' element={<LogsPage />} />
              <Route path='/logs/:id' element={<LogPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route
                path='/my-logs-map'
                element={
                  <PrivateRoute>
                    <MapPage />
                  </PrivateRoute>
                }
              />
              <Route path='/u/:userId' element={<ProfilePage />} />
              <Route path='/register' element={<RegisterPage />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen />
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
