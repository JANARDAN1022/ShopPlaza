import { useLocation } from "react-router-dom";
import Footer from "./layout/Footer/Footer";

const ShowFooter = () => {
  const location = useLocation();
  const Location = location.pathname;
  const productId = Location.split("/")[2];
  const hideNav =
    Location === "/RegisterAsSeller" ||
    Location === "/PasswordCreation" ||
    Location === "/OnBoarding-Dashboard";

  if (hideNav) {
    return null; // Return null to hide the navbar
  } else if (productId && Location === `/BuyNow/${productId}`) {
    return null;
  }

  return <Footer />;
};

export default ShowFooter;
