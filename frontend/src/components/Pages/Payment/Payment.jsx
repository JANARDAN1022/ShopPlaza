import React, { useEffect, useState,useContext } from "react";
import "./Payment.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { BsFillBagFill, BsCashCoin, BsStripe } from "react-icons/bs";
import { FaTruckMoving } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { TbCash } from "react-icons/tb";
import { MdLocationOn } from "react-icons/md";
import { State, City } from "country-state-city";
import { GETCartitems } from "../../../Actions/CartAction";
import { CheckoutContext } from "../../../Context/CheckoutContext";
import {
  AddShippingInfo,
  GETShippingInfo,
  DeleteShippingInfo,
  UpdateShippingInfo
} from "../../../Actions/ShippingAction";

const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.ShippingInfo);
  const {selectedAddress,setSelectedAddress,paymentMethod,setPaymentMethod}=useContext(CheckoutContext);
  const [rotate, setrotate] = useState(false);
  const [ShowNewAddress, setShowNewAddress] = useState(false);
  const [address, setaddress] = useState("");
  const [ChangeAddress, setChangeAddress] = useState(false);
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [email, setemail] = useState("");
  const [PlaceType, setPlaceType] = useState("");
  const [showError, setshowError] = useState("");
  const [ShowEdit,setShowEdit]=useState(false);
  const [showPin, setshowPin] = useState(false);
  const [Data,setData]=useState({
    userId:null,
    Id:null,
    address: "",
    state:["",""],
    city: "",
    pinCode: "",
    phoneNo: "",
    email: "",
    placeType:"",
  })
  const Navigate = useNavigate();

  
  const StateName = state !== "" ? State.getStateByCodeAndCountry(`${state}`, "IN")?.name : "";


 


  const dispatch = useDispatch();
  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(GETCartitems(userId));
    }
  }, [dispatch, userId]);

  const CartTotal = cartItems?.reduce(
    (sum, items) => sum + items.quantity * items.price,
    0
  );

  const ShippingCharges =
    CartTotal > 10000 && CartTotal < 50000
      ? (CartTotal * 1) / 100
      : CartTotal > 50000
      ? (CartTotal * 2) / 100
      : 0;


 
 const HandleremoveAddress = (infoid) => {
    if (infoid) {
      dispatch(DeleteShippingInfo(infoid));
    }
    if (infoid === selectedAddress?._id) {
      setSelectedAddress(null);
      setChangeAddress(false);
    }
  };

  const HandleSlelectState = (e) => {
    setstate(e.target.value);
    if (StateName === "") {
      setcity("");
    }
  };

  const HandleAddaddress = () => { 
    if (
      address === "" ||
      state === "" ||
      city === "" ||
      PlaceType === "" ||
      phoneNo === ''||
      pincode === '' ||
      email===''
    ) {
      setshowError("All Fields Are Required, Make Sure No Fields Are Empty");
      setTimeout(() => {
        setshowError("");
      }, 3000);
    } else{
      dispatch(
        AddShippingInfo(
          userId,
          address,
          city,
          StateName,
          pincode,
          phoneNo,
          email,
          PlaceType
        )
      );
       setSelectedAddress({
        userId,
        address,
        city,
        StateName,
        pincode,
        phoneNo,
        email,
        PlaceType,
      });
      setShowNewAddress(false);
      setshowError("");
    }
  };

  const HandleProceedToPay = () => {
    if (selectedAddress !== null && paymentMethod!==null) {
      Navigate(`/Confirmation`);
    } else if (selectedAddress === null) {
      if (shippingInfo?.length > 0) {
        setChangeAddress(true);
      } else {
        setShowNewAddress(true);
      }
    }
  };

  const HandleEdit = ()=>{
    if(Data.Id!==null && showError===''){
      dispatch(UpdateShippingInfo(Data.Id,Data.address,Data.state[0],Data.city,Data.email,Data.phoneNo,Data.pinCode,Data.placeType));
      if(Data.Id===selectedAddress?._id){
        setSelectedAddress({
        userId:Data.userId,
        address:Data.address,
        city:Data.city,
        StateName:Data.state[0],
        pincode:Data.pinCode,
        phoneNo:Data.phoneNo,
        email:Data.email,
        PlaceType:Data.placeType,
        _id:Data.Id,
        });
      }
      setTimeout(() => {
        setShowEdit(false);
      }, 500);
    }
  }


  useEffect(() => {
    dispatch(GETShippingInfo(userId));
  }, [dispatch, userId]);

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
            {shippingInfo?.length < 1 ? (
              <div className="NoSavedAddress">
                <div className="NoAddressDiv">
                  <FaTruckMoving size={70} className="TruckNoAdress" />
                  <h1>No Saved Address</h1>
                </div>
                <div
                  className="AddNewAddressNoSaved"
                  onClick={() => setShowNewAddress(true)}
                >
                  <span>Add New Address</span>
                  <AiOutlinePlus size={20} />
                </div>
              </div>
            ) : (
              <div className="AvaialableAddresses">
                <div className="AvaialableAddressesHead">
                  <div className="SelectAddressBelow">
                    <FaTruckMoving size={40} />
                    <span>Shipping Address</span>
                  </div>
                  <div className="ChangeAddress">
                    <div
                      className="PincodeShippingHead"
                      onMouseEnter={() => setshowPin(true)}
                      onMouseLeave={() => setshowPin(false)}
                    >
                      <MdLocationOn size={20} />
                      <span>{selectedAddress?.pincode}</span>
                    </div>
                    <div
                      className="PincodeHover"
                      style={{
                        display:
                          shippingInfo?.length > 1 &&
                          showPin &&
                          selectedAddress !== null
                            ? ""
                            : "none",
                      }}
                    >
                      <span>From Saved Addresses</span>
                      <div className="PincodeSelectedAddresInfo">
                        <span>{selectedAddress?.pincode} - </span>
                        <span>
                          {selectedAddress?.address?.split("").slice(0, 20).join("")}....
                        </span>
                      </div>
                      <div className="PincodeAddresSavedInfo">
                        <span>
                          {shippingInfo?.[0]?._id === selectedAddress?._id
                            ? shippingInfo[1]?.pincode
                            : shippingInfo[0]?.pincode}{" "}
                          -{" "}
                        </span>
                        <span>
                          {shippingInfo?.[0]?._id === selectedAddress?._id
                            ? shippingInfo?.[1]?.address.split("").slice(0, 20).join("")
                            : shippingInfo?.[0]?.address?.split("").slice(0, 20).join("")}....
                              
                               
                          
                        </span>
                      </div>
                    </div>
                    <span onClick={() => setChangeAddress(true)}>
                      Change Address
                    </span>
                  </div>
                </div>
                <div className="SDAddress">
                  <div className="SDcontainer">
                    <div className="AEPiNFO">
                      {selectedAddress !== null ? (
                        <div className="ADDRessinfo">
                          <div className="SelectedAddress">
                            <span className="SADDress">
                              {selectedAddress.address}
                            </span>
                            <span>
                              {selectedAddress.city}{" "}
                              {selectedAddress.state
                                ? selectedAddress.state
                                : selectedAddress.StateName}
                            </span>
                            <div className="SelectedPincode">
                              <span>Pincode :</span>
                              <div className="SP">
                                <MdLocationOn size={20} />
                                <span>{selectedAddress.pincode}</span>
                              </div>
                            </div>
                          </div>
                          <div className="EPHinfo">
                            <div className="Einfo">
                              <span>EMAIL :</span>
                              <span>{selectedAddress.email}</span>
                            </div>
                            <div className="PHinfo">
                              <span>PHONE NO :</span>
                              <span>{selectedAddress.phoneNo}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="SelectedNone">
                          <span
                            onClick={() => setChangeAddress(true)}
                            style={{ cursor: "pointer" }}
                          >
                            Select From Your Saved Addresses
                          </span>
                        </div>
                      )}
                      <div className="AddNewAddress">
                        <span onClick={() => setShowNewAddress(true)}>
                          {" "}
                          Add New Address
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div></div>
              </div>
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
            <div className="SelectMethodofPayment">
              <div
                className={
                  paymentMethod==='stripe' ? `StripeMethod SelectedMethod` : `StripeMethod`
                }
                onClick={() => {
                 setPaymentMethod('stripe');
                }}
              >
                <BsStripe size={30} />
                <span>Pay With Stripe</span>
              </div>
              <div
                className={
                  paymentMethod==='Cash' ? `CashMethod SelectedMethod` : `CashMethod`
                }
                onClick={() => {
                  setPaymentMethod('Cash');
                }}
              >
                <TbCash size={30} />
                <span>Cash on Delievery</span>
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
                      <div key={items?._id} className="OrderItemsContainer">
                        <div className="OrederitemsLeft">
                          <div className="OrderItemImage">
                            <img src={items?.imgUrl} alt={items?.name} />
                          </div>

                          <div className="OrderItemsInfo">
                            <span>{items?.name?.split(" ").length>5?items?.name?.split(" ").slice(0,5).join(" "):items?.name}</span>
                            <span>Rs {items?.price}</span>
                            <span>#{items?.ItemId}</span>
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
                <span>{CartTotal}</span>
              </div>
              <div className="ShippingChargerCheckout">
                <span>
                  Shipping Charges{" "}
                  {CartTotal > 50000 ? "(2%)" : CartTotal < 10000 ? "" : "(1%)"}
                </span>
                <span>{ShippingCharges < 1 ? "FREE" : ShippingCharges}</span>
              </div>
            </div>

            <div className="TotalAmountOrders">
              <div className="SumAmount">
                <span className="TotalHeadOrders">Total</span>
                <span className="TotalAmountInfo">
                  RS {CartTotal + ShippingCharges}
                </span>
              </div>
            </div>
          </div>

          <button onClick={HandleProceedToPay}>Proceed</button>
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
          <span className="AddNewAddressHead">Add New Address</span>
          <div className="CityStateInfo">
            <div className="StateSelect">
              <span>Select Your State :</span>
              <select
                value={state}
                name="selectstate"
                onChange={HandleSlelectState}
              >
                <option value=" ">State</option>
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
              <span>Select Your City :</span>
              <select
                name="selectcity"
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
            <span>Shipping Address :</span>
            <input
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              placeholder="House-No/Sector/Roadname/Area/NearPlace"
              name="addressinput"
            />
          </div>

          <div className="PincodePhoneNumberInfo">
            <div className="AddNewAddressPhoneNo">
              <span>Phone No :</span>
              <input
                type="number"
                value={phoneNo}
                name="numberinput"
                placeholder="Enter Your 10 Digit Phone No"
                onChange={(e) => {
                  setphoneNo(parseInt(e.target.value));
                }}
              />
            </div>
            <div className="AddNewaddresspincode">
              <span>Pincode :</span>
              <input
                type="number"
                value={pincode}
                name="pincodeinput"
                placeholder="Enter Your City Pincode"
                onChange={(e) => {
                  setpincode(parseInt(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="AddNewAddressEmail">
            <span>Email :</span>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="emailInput"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div className="AddressType">
            <span
              onClick={() => setPlaceType("office")}
              style={{
                backgroundColor:
                  PlaceType === "office" ? " rgba(40, 116, 240,0.2)" : "",
                color: PlaceType === "office" ? "rgb(40,116,240)" : "",
              }}
            >
              Office
            </span>
            <span
              onClick={() => setPlaceType("Home")}
              style={{
                backgroundColor:
                  PlaceType === "Home" ? " rgba(40, 116, 240,0.2)" : "",
                color: PlaceType === "Home" ? "rgb(40,116,240)" : "",
              }}
            >
              Home
            </span>
          </div>
          <span className="AddAddresserror" style={{ display: showError !== "" ? "" : "none"}}>
            {showError}*
          </span>
          <div className="SubmitAddressBtn">
            <button onClick={HandleAddaddress}>Add This Address</button>
          </div>
        </div>
      </div>

      <div
        className="SavedAddresses"
        style={{ display: ChangeAddress ? "" : "none" }}
      >
        <AiOutlineClose
          size={30}
          className="CloseCHangeAddress"
          onClick={() => setChangeAddress(false)}
        />
        <div className="SelectSavedAddresshead">
          <span>Select From Saved Addresses</span>
        </div>
        {shippingInfo &&
          shippingInfo.map((info) => (
            <div className="SavedAddressInfos" key={info?._id}>
              <div className="SavedInfo">
                <div className="addressInfoBelow">
                  <span>{info?.address}</span>
                  <span>
                    {info?.state} {info?.city}
                  </span>
                  <div className="PincodeSaved">
                    <span>Zip/Pincode :</span>
                    <MdLocationOn size={16} />
                    <span>{info?.pincode}</span>
                  </div>
                </div>
                <div className="UserEmailPhoneInfo">
                  <div className="USERemail">
                    <span>EMAIL :</span>
                    <span>{user?.email}</span>
                  </div>
                  <div className="UserPhoneNUM">
                    <span>Phone Number :</span>
                    <span>{info?.phoneNo}</span>
                  </div>
                </div>
              </div>
              <div className="PickAddress">
                <div className="SelectAddressOption">
                  <label htmlFor={info?.phoneNo}>Select Address</label>
                  <input
                    value={info}
                    type="radio"
                    id={info.phoneNo}
                    autoComplete="off"
                    name="SelectAddressInfo"
                    checked={selectedAddress?._id===info?._id}
                    onClick={() => {
                     setSelectedAddress(info);
                      setChangeAddress(false);
                    }}
                  />
                </div>
                <span onClick={() => HandleremoveAddress(info?._id)}>
                  Remove
                </span>
                <span onClick={()=>{
                  setData({
                    userId:info?.userId,
                    Id:info?._id,
                    address:info?.address,
                    state:[info?.state,''],
                    city:info?.city,
                    email:info?.email,
                    phoneNo:info?.phoneNo,
                    pinCode:info?.pincode,
                    placeType:info?.PlaceType
                  });
                  setShowEdit(true);
                  setChangeAddress(false);
                  }}>Edit</span>
              </div>
            </div>
          ))}
      </div>
      <div className="EditAddressMain" style={{display:ShowEdit?'':'none'}}>
      <div className="EditAddressContainer">
          <AiOutlineClose
            size={30}
            className="CloseNewAddress"
            onClick={() => setShowEdit(false)}
          />
          <span className="AddNewAddressHead">Edit Address</span>
          <div className="CityStateInfo">
            <div className="StateSelect">
              <span>Select Your State :</span>
              <select
                value={Data.state}
                name="selectstate"
                onChange={(e)=>setData({...Data,state:[State.getStateByCodeAndCountry(e.target.value,"IN")?.name,e.target.value]})}
              >
                <option value={Data.state[0]}>{Data.state[0]}</option>
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

            <div className="CitySelect">
              <span>Select Your City :</span>
              <select
                name="selectcity"
                value={Data.city}
                onChange={(e) => {
                  setData({...Data, city:e.target.value});
                }}
              >
                <option value={Data.city}>{Data.city}</option>
                {City &&
                  City.getCitiesOfState("IN", Data.state[1]).map((cities) => (
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
            <span>Shipping Address :</span>
            <input
              value={Data.address}
              onChange={(e) => setData({...Data,address:e.target.value})}
              placeholder="House-No/Sector/Roadname/Area/NearPlace"
              name="addressinput"
            />
          </div>

          <div className="PincodePhoneNumberInfo">
            <div className="AddNewAddressPhoneNo">
              <span>Phone No :</span>
              <input
                type="number"
                value={Data.phoneNo}
                name="numberinput"
                placeholder="Enter Your 10 Digit Phone No"
                onChange={(e) => {
                  setData({...Data, phoneNo:parseInt(e.target.value)});
                }}
              />
            </div>
            <div className="AddNewaddresspincode">
              <span>Pincode :</span>
              <input
                type="number"
                value={Data.pinCode}
                name="pincodeinput"
                placeholder={Data.pinCode}
                onChange={(e) => {
                  setData({...Data, pinCode:parseInt(e.target.value)});
                }}
              />
            </div>
          </div>
          <div className="AddNewAddressEmail">
            <span>Email :</span>
            <input
              type="email"
              placeholder={Data.email}
              name="emailInput"
              value={Data.email}
              onChange={(e) => setData({...Data,email:e.target.value})}
            />
          </div>

          <div className="AddressType">
            <span
              onClick={() => setData({...Data,placeType:"office"})}office
              style={{
                backgroundColor:
                  Data.placeType === "office" ? " rgba(40, 116, 240,0.2)" : "",
                color: Data.placeType === "office" ? "rgb(40,116,240)" : "",
              }}
            >
              Office
            </span>
            <span
              onClick={() => setData({...Data,placeType:"Home"})}
              style={{
                backgroundColor:
                Data.placeType === "Home" ? " rgba(40, 116, 240,0.2)" : "",
                color: Data.placeType === "Home" ? "rgb(40,116,240)" : "",
              }}
            >
              Home
            </span>
          </div>
          <span className="AddAddresserror" style={{ display: showError !== "" ? "" : "none"}}>
            {showError}*
          </span>
          <div className="SubmitAddressBtn">
            <button onClick={HandleEdit}>Edit This Address</button>
          </div>
          </div>
        </div>
    </div>
  );
};

export default Payment;
