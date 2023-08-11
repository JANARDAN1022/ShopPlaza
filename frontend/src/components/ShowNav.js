import { useLocation } from "react-router-dom";
import Navbar from "./layout/Header/Navbar";

const ShowNav = () => {
  const location = useLocation();
  const Location = location.pathname;
  const productId = Location.split("/")[2];
  const hideNav =
    Location === "/Checkout" ||
    Location === "/Confirmation" ||
    Location === "/process/payment" ||
    Location === "/RegisterAsSeller" ||
    Location === "/PasswordCreation" ||
    Location==='/OnBoarding-Dashboard'||
    Location==='/test';

  if (hideNav) {
    return null; // Return null to hide the navbar
  } else if (productId && Location === `/BuyNow/${productId}`) {
    return null;
  }

  return <Navbar />;
};

export default ShowNav;
