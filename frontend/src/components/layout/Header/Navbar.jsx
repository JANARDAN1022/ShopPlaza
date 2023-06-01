import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { Icon } from "react-icons-kit";
import { ic_search } from "react-icons-kit/md/ic_search";
import { ic_shopping_cart } from "react-icons-kit/md/ic_shopping_cart";
import { ic_keyboard_arrow_up } from "react-icons-kit/md/ic_keyboard_arrow_up";
import { ic_keyboard_arrow_down_twotone } from "react-icons-kit/md/ic_keyboard_arrow_down_twotone";
import { ic_assignment_turned_in } from "react-icons-kit/md/ic_assignment_turned_in";
import { iosContact } from "react-icons-kit/ionicons/iosContact";
import { heart } from "react-icons-kit/fa/heart";
import { mark } from "react-icons-kit/iconic/mark";
import { download } from "react-icons-kit/iconic/download";
import { RxCross2 } from "react-icons/rx";
import { LogoutUser } from "../../../Actions/UserAction";

const Navbar = () => {
  const [Hover, setHover] = useState(false);
  const [keyword, setkeyword] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const SearchHandler = () => {
    if (keyword) {
      const word = keyword.trim();
      Navigate(`/products/${word}`);
    } else {
      Navigate("/");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      SearchHandler();
    }
  };

  const LogoutHandler = ()=>{
   dispatch(LogoutUser());
  }

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cartItems } = useSelector((state) => state.cart);
  const Items = cartItems?.length;

  return (
    <div className="NavMain">
      <div className="leftNav">
        <div className="leftcontent">
          <h3>
            <Link to="/">
              <i>ShopPlaza</i>
            </Link>{" "}
          </h3>
          <p>
            Explore <i>More</i>
          </p>
        </div>
      </div>
      <div className="middleNav">
        <input
          onChange={(e) => setkeyword(e.target.value)}
          value={keyword}
          type="search"
          placeholder="Search for products, brands and more"
          onKeyDown={handleKeyPress}
        />
        <RxCross2
          className="CancelSearchIcon"
          size={20}
          style={{ display: keyword !== "" ? "" : "none" }}
          onClick={() => setkeyword("")}
        />

        <Icon
          className="searchicon"
          icon={ic_search}
          size={23}
          onClick={SearchHandler}
        />
      </div>
      <div className="rightNav">
        <div className="containerforlogin">
          <Link to={isAuthenticated ? "/MyAccount" : "/Login"}>
            <button onClick={() => setHover(false)}>{`${
              isAuthenticated ? user.FirstName : "Login"
            }`}</button>
          </Link>

          <div className="LoginPopUpDiv">
            <div className="wrapper">
              <div className="newcustomer">
                <span>{`${
                  isAuthenticated ? "Your Account" : "New Customer?"
                }`}</span>
                {isAuthenticated?
               <span className="signupnavlink" onClick={LogoutHandler}>Logout</span>
                :
                <Link className="signupnavlink" to="/Signup">Sign Up</Link>
                     }
                </div>
            </div>

            <div className="wrapper2">
              <div className="MyProfile" onClick={()=>{
                  if(isAuthenticated){
                    Navigate('/MyAccount');
                  }else{
                    Navigate('/Login');
                  }
                }}>
                <Icon className="ProfileNavIcon" icon={iosContact} size={20} />
                <span>My Profile</span>
              </div>
            </div>

            <div className="wrapper2">
              <div className="MyProfile">
                <Icon
                  className="ProfileNavIcon"
                  icon={ic_assignment_turned_in}
                  size={20}
                />
                <span>Orders</span>
              </div>
            </div>

            <div className="wrapper2">
              <div className="MyProfile">
                <Icon className="ProfileNavIcon" icon={heart} size={18} />
                <span>WishList</span>
              </div>
            </div>
          </div>
        </div>
        <h4>Become a Seller</h4>
        <div
          className="containerforMore"
          onMouseEnter={() => setHover(!Hover)}
          onMouseLeave={() => setHover(!Hover)}
        >
          <div className="MoreSelectNav">
            <h4>More</h4>
            <Icon
              className="ArrowiconNav"
              icon={
                Hover ? ic_keyboard_arrow_up : ic_keyboard_arrow_down_twotone
              }
              size={15}
            />
          </div>
          <div className="MorePopUpDiv">
            <div className="wrapper2">
              <div className="MyProfile">
                <Icon className="ProfileNavIcon" icon={mark} size={18} />
                <span>24x7 Customer Care</span>
              </div>
            </div>

            <div className="wrapper2">
              <div className="MyProfile">
                <Icon className="ProfileNavIcon" icon={download} size={15} />
                <span>Download App</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cartNav" onClick={() =>Navigate(`/Cart`)}>
          <Icon className="CarticonNav" icon={ic_shopping_cart} size={20} />
          <h4>Cart</h4>
          <div
            className="NumberOfItemsInCart"
            style={{ display: Items > 0 ? "flex" : "none" }}
          >
            {Items}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
