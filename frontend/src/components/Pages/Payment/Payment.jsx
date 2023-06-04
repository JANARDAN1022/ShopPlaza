import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { BsFillBagFill, BsCashCoin } from "react-icons/bs";
import { FaTruckMoving } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { State, City } from "country-state-city";
import {AddShippingInfo,GETShippingInfo} from '../../../Actions/CartAction'

const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const [rotate, setrotate] = useState(false);
  const [ShowNewAddress, setShowNewAddress] = useState(false);
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState(Number);
  const [phoneNo, setphoneNo] = useState(Number);
  const [PlaceType, setPlaceType] = useState("");
  const [showError,setshowError]=useState('');

 

  
  const StateName = state!==''?State.getStateByCodeAndCountry(`${state}`,"IN")?.name : '';


  //console.log(ShowNewAddress);
  console.log(address==='' || state==='' || city==='' || PlaceType==='' || (phoneNo===null || !phoneNo) || (pincode===null || !pincode))


  const dispatch = useDispatch();
   const userId = user?._id;

  const HandleSlelectState = (e) => {
    setstate(e.target.value); 
  
    if (StateName === "") {
      setcity('');
    }
  };

  const HandleAddaddress = ()=>{
         if(address==='' || state==='' || city==='' || PlaceType==='' || (phoneNo===null || !phoneNo) || (pincode===null || !pincode)){
          setshowError('All Fields Are Required, Make Sure No Fields Are Empty');
          setTimeout(() => {
            setshowError('');
          }, 3000);

           }else{
            dispatch(AddShippingInfo(userId,address,city,StateName,pincode,phoneNo,PlaceType));
            setShowNewAddress(false);
            setshowError('');
           }
  }

  useEffect(()=>{
    if(!shippingInfo==null && userId){
      dispatch(GETShippingInfo(userId));
    }
  },[dispatch,shippingInfo,userId]);

  console.log(shippingInfo);

  


  return (
    <div className="PaymentMain">
      <div className="PaymentNav">
        <div className="PaymentNaveLeft">
          <h3>
            <Link to="/">
              <i>ShopPlaza</i>
            </Link>{" "}
          </h3>
        </div>

        <div
          className="PaymentNavRight"
          onMouseEnter={() => setrotate(true)}
          onMouseLeave={() => setrotate(false)}
        >
          <span> Hello {user?.FirstName}</span>
          <MdKeyboardArrowDown
            size={25}
            style={{ transform: rotate ? "rotate(180deg)" : "" }}
          />
        </div>
      </div>

      <div
        className="StepInfo"
        style={{ filter: ShowNewAddress ? "blur(3px)" : "" }}
      >
        <h4 style={{ color: "rgba(0,0,0,0.5)" }}>SHOPPING CART</h4>
        <MdKeyboardArrowRight size={25} />
        <h4 style={{ color: "black" }}>CHECKOUT</h4>
        <MdKeyboardArrowRight size={25} />
        <h4 style={{ color: "rgba(0,0,0,0.5)" }}>CONFIRMATION</h4>
      </div>

      <div
        className="PaymentContainer"
        style={{
          filter: ShowNewAddress ? "blur(3px)" : "",
          pointerEvents: ShowNewAddress ? "none" : "",
        }}
      >
        <div className="PaymentLeft">
          <div className="Shipping">
            {shippingInfo == null ? (
              <div className="NoSavedAddress">
                <div className="NoAddressDiv">
                  <FaTruckMoving size={70} className="TruckNoAdress" />
                  <h1>No Saved Address</h1>
                </div>
                <div
                  className="AddNewAddress"
                  onClick={() => setShowNewAddress(true)}
                >
                  <span>Add New Address</span>
                  <AiOutlinePlus size={30} />
                </div>
              </div>
            ) : (
              <div>hey</div>
            )}
          </div>

          <div className="PaymentMethod">
            <div className="PaymentMethodTitle">
              <div className="PaymentMethodHead">
                <BsCashCoin size={40} />
                <span>Payment Method</span>
              </div>
              <div className="EditPaymentMethod">
                <span>Add New Payment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="PaymentRight">
          <div className="OrderPaymentInfo">
            <div className="OIPHead">
              <div className="OIPHEADdiv">
                <BsFillBagFill size={40} />
                <p>Your Order Summary</p>
              </div>
              <Link to="/Cart">Edit Bag</Link>
            </div>

            <div className="OrderProducts">
              <div className="orderProductsHead">
                <div className="ItemDescriptionhead">
                  <span>ITEMS DESCRIPTIONS</span>
                </div>

                <div className="orderProductsHeadRight">
                  <span>Quantity</span>
                  <span className="OrderHeadPrice">Price</span>
                </div>
              </div>

              <div className="CartItemsInfo">
                <div className="OrderItems">
                  {cartItems &&
                    cartItems.map((items) => (
                      <div key={items?.product} className="OrderItemsContainer">
                        <div className="OrederitemsLeft">
                          <div className="OrderItemImage">
                            <img src={items?.image} alt={items?.name} />
                          </div>

                          <div className="OrderItemsInfo">
                            <span>{items?.name}</span>
                            <span>Rs {items?.price}</span>
                            <span>#{items?.product}</span>
                          </div>
                        </div>

                        <div className="OrderItemsRight">
                          <span className="OrderitemsQuantity">
                            {items?.quantity}
                          </span>
                          <span className="OrderItemsPrice">
                            {" "}
                            {`Rs ${items?.quantity * items?.price}`}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="OrderSUbTotal">
              <div className="Subtotal">
                <span>SubTotal</span>
                <span>2000</span>
              </div>
              <div className="ShippingChargerCheckout">
                <span>Shipping Charges</span>
                <span>Free</span>
              </div>
            </div>

            <div className="TotalAmountOrders">
              <div className="SumAmount">
                <span className="TotalHeadOrders">Total</span>
                <span className="TotalAmountInfo">
                  RS{" "}
                  {cartItems?.reduce(
                    (sum, items) => sum + items.quantity + items.price,
                    0
                  )}
                </span>
              </div>
            </div>
          </div>

          <button>Proceed To Pay</button>
        </div>
      </div>

      <div
        className="CreateNewAddress"
        style={{ display: ShowNewAddress ? "" : "none" }}
      >
        <div className="CreateNewAddressContainer">
          <AiOutlineClose
            size={30}
            className="CloseNewAddress"
            onClick={() => setShowNewAddress(false)}
          />
          <div className="CityStateInfo">
            <div className="StateSelect">
              <select value={state} onChange={HandleSlelectState}>
                <option value=" ">
                  State
                </option>
                {State &&
                  State.getStatesOfCountry("IN").map((states) => (
                    <option
                      key={`STATE_${states.isoCode}`}
                      value={states.isoCode}
                    >
                      {states.name}
                    </option>
                  ))}
              </select>
            </div>

            <div
              className="CitySelect"
              style={{ display: state !== "" ? "" : "none" }}
            >
              <select
                value={city}
                onChange={(e) => {
                  setcity(e.target.value);
                }}
              >
                <option value="">{city !== "" ? city : "City"}</option>
                {City &&
                  City.getCitiesOfState("IN", state).map((cities) => (
                    <option
                      key={`CITY_${cities.name}_${cities.longitude}`}
                      value={cities.isoCode}
                    >
                      {cities.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="AddressInfo">
            <input
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              placeholder="House-No/Sector/Roadname/Area/NearPlace"
            />
          </div>

          <div className="PincodePhoneNumberInfo">
            <input
              type="number"
              value={phoneNo}
              onChange={(e) => {
                setphoneNo(e.target.value);
              }}
            />
            <input
              type="number"
              value={pincode}
              onChange={(e) => {
                setpincode(e.target.value);
              }}
            />
          </div>

          <div className="AddressType">
            <span onClick={() => setPlaceType("office")}>Office</span>
            <span onClick={() => setPlaceType("Home")}>Home</span>
          </div>
          <span style={{display:showError!==''?'':'none'}}>{showError}</span>
          <div className="SubmitAddressBtn">
            <button onClick={HandleAddaddress}>Add This Address</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
