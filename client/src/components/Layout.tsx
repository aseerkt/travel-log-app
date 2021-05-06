import { useLocation } from 'react-router-dom';
import Header from './Header';
import Showcase from './Showcase';

const Layout: React.FC = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      <Header />
      {location.pathname === '/' && <Showcase />}
      {children}
    </div>
  );
};

export default Layout;
