import { useLocation } from 'react-router-dom';
import Navbar from './layout/Header/Navbar';

const ShowNav = () => {
  const location = useLocation();
  const hideNav = location.pathname === '/Checkout';

  if (hideNav) {
    return null; // Return null to hide the navbar
  }

  return <Navbar />;
};

export default ShowNav;
