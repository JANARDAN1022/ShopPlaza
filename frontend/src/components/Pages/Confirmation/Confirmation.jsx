import {React,useContext,useEffect,useState} from 'react';
import './Confirmation.css';
import {BsCheckAll,BsStripe} from 'react-icons/bs';
import { TbCash } from "react-icons/tb";
import {CheckoutContext} from '../../../Context/CheckoutContext';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import '../Payment/Payment.css';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Confirmation = () => {
  const {selectedAddress,paymentMethod} = useContext(CheckoutContext);
  const { cartItems } = useSelector((state) => state.cart);
  const {user} = useSelector(state=>state.user);
  const [rotate, setrotate] = useState(false);
  const [Data,setData]=useState(null);
  const Location = useLocation();
  const ProductId = Location.search?.split('?')[1];
  const UserId = user?._id;
  const Navigate = useNavigate();

const FetchSingleTotal = async()=>{
  if(ProductId){
    const {data} = await axios.get(`https://shop-plaza.vercel.app/api/Payment/FinalAmount/${UserId}?productId=${ProductId}`);
    setData(data?.ToBePaid);
  }else{
    const {data} = await axios.get(`https://shop-plaza.vercel.app/api/Payment/FinalAmount/${UserId}`)
    setData(data?.ToBePaid);
  }
}

const HandlePlaceOrder = async()=>{
if(ProductId){
  try {
 const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
 await axios.post(`https://shop-plaza.vercel.app/api/Orders/NewOrder/${UserId}`,{Shippinginfo:selectedAddress,ProductId:ProductId},config);
    if(paymentMethod==='Cash'){
      Navigate('/orderPlaced')
    }else{
      Navigate('/process/payment');
    } 
  } catch (error) {
   console.log(error); 
   }

  }else{
    try {
      const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
      await axios.post(`https://shop-plaza.vercel.app/api/Orders/NewOrders/${UserId}`,{Shippinginfo:selectedAddress,CartItems:cartItems},config);
         if(paymentMethod==='Cash'){
           Navigate('/orderPlaced')
         }else{
           Navigate('/process/payment');
         } 
       } catch (error) {
        console.log(error); 
        }
  }
}

  useEffect(()=>{
   FetchSingleTotal();
  })
  const HandleConfirmEdit = ()=>{
    if(ProductId){
     Navigate(`/BuyNow/${ProductId}`);
    }else{
     Navigate(`/Checkout`);
    }
  }

  return (
    <div className='ConfirmationMain'>
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
      >
        <h4 style={{ color: "rgba(0,0,0,0.5)" }}>SHOPPING CART</h4>
        <MdKeyboardArrowRight size={25} />
        <h4 style={{ color:  "rgba(0,0,0,0.5)" }}>CHECKOUT</h4>
        <MdKeyboardArrowRight size={25} />
        <h4 style={{ color:'black' }}>CONFIRMATION</h4>
      </div>

      <div className='ConfirmationContainer'>
        <div className='ConfirmDetails'>
          <span>Confirm Details</span>
        <span onClick={HandleConfirmEdit}>Edit</span>
        </div>
        <div className='ConfirmEmail'>
         
         <div className='ConfirmEmailLeft'>
         <span>Email</span>
         <BsCheckAll size={50} />
         </div>

         <div className='ConfirmEmailRight'>
          <span>{selectedAddress?.email}</span>
         </div>

        </div>

        <div className='ConfirmPhoneNo'>

        <div className='ConfirmPhoneNoLeft'>
         <span>Phone No</span>
         <BsCheckAll size={50} />
         </div>

         <div className='ConfirmPhoneNoRight'>
          <span>{selectedAddress?.phoneNo}</span>
         </div>
        </div>

        <div className='ConfirmAddress'>
        <div className='ConfirmAddressLeft'>
         <span>Shipping Address</span>
         <BsCheckAll size={50} />
         </div>

         <div className='ConfirmAddressRight'>
          <div className='ConfirmAddressRightContainer'>
          <span>{selectedAddress?.address}</span>
          </div>
         </div>
        </div>

        <div className='ConfirmPaymentMethod'>
        <div className='ConfirmPaymentMethodLeft'>
         <span>Payment Method</span>
         <BsCheckAll size={50} />
         </div>

         <div className='ConfirmPaymentMethodRight'>
          {paymentMethod==='Cash'?<TbCash size={50} style={{color:'green'}} />:<BsStripe size={50} style={{color:'#2874f0'}} /> }
          <span style={{color:paymentMethod==='Cash'?'green':'#2874f0'}}>{paymentMethod==='Cash'?'Cash On Delivery':'Stripe Payment'}</span>
         </div>
        </div>

        <div className='TotalPayableAmount'>
        <div className='TotalConfLeft'>
          <span>Amount To Be Paid</span>
          <BsCheckAll size={50} />
        </div>
        <div className='TotalConfRight'>
          <span>Rs {Data}</span>
        </div>
        <div>

        </div>
        </div>

        <div className='PlaceOrderButton'>
          <button onClick={HandlePlaceOrder}>Place Order</button>
        </div>


      </div>
    </div>
  )
}

export default Confirmation