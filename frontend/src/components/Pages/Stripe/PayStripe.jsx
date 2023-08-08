import React, { useEffect, useRef, useState} from 'react';
//import { useContext } from 'react';
import './PayStripe.css';
import {CardNumberElement,CardCvcElement,CardExpiryElement,useElements,useStripe} from '@stripe/react-stripe-js';
import {AiFillCreditCard} from 'react-icons/ai';
import {MdVpnKey} from 'react-icons/md';
import {BsFillCalendarEventFill} from 'react-icons/bs';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
//import { CheckoutContext } from '../../../Context/CheckoutContext';
import { useNavigate } from 'react-router-dom';

const PayStripe = () => {
  const [StripeApiKey,setStripeApiKey]=useState("");
  const [TotalAmount,setTotalAmount]=useState(null);
  const [clientSecret,setclientSecret]=useState('');
  const STRIPE = useStripe();
  const ELEMENTS =useElements();
  const PaybtnRef = useRef();
  const Navigate = useNavigate();
  //const {selectedAddress}=useContext(CheckoutContext);
    const {user/*loading,isAuthenticated*/} =useSelector(state=>state.user);
    const Id = user?._id;
  
    async function getTotalAmount(){
    const {data} = await axios.get(`https://shop-plaza.vercel.app/api/Payment/TotalAmount/${Id}`);
    setTotalAmount(data?.totalAmount);
   }

const GetStripeApiKey = async()=>{
  const {data} = await axios.get('https://shop-plaza.vercel.app/api/Payment/stripeapikey');
  setStripeApiKey(data?.stripeApiKey);
}
const clientsecretKey = async()=>{
  const {data} = await axios.post(`https://shop-plaza.vercel.app/api/Payment/process/Stripe`,{});
  setclientSecret(data?.clientSecret);
}

useEffect(()=>{
  clientsecretKey();
  GetStripeApiKey();
  getTotalAmount();
  });    
  console.log(clientSecret);

//console.log(typeof(StripeApiKey));
const StripePromise =StripeApiKey!=='' && loadStripe(StripeApiKey);

const sumbithandler = async(e)=>{
  e.preventDefault();

  PaybtnRef.current.disabled = true;  
  try {
   const config = {
    Headers:{
    "Content-Type":"application/json",
   },
  };

  const {data} = await axios.post(`https://shop-plaza.vercel.app/api/Payment/process/Stripe`,{Id},config);
  const ClientSecret = data?.clientSecret;

  if(!STRIPE || !ELEMENTS) return;

  const result = await STRIPE.confirmCardPayment(ClientSecret,{
    payment_method:{
      card: ELEMENTS.getElement(CardNumberElement),
    /*  billing_details:{
        email:selectedAddress?.email,
        address:{
          line1:selectedAddress?.address,
          state:selectedAddress?.state,
          city:selectedAddress?.city,
          postal_code:selectedAddress?.pincode,
          country:'India',
          
        }
      }*/

    }
 }
  )
  if(result.error){
   PaybtnRef.current.disabled=false; 
  }else{
    if(result.paymentIntent.status === 'succeeded'){
      Navigate('/orderPlaced')
    }else{
    Navigate('/Checkout');
    }
  }
  } catch (error) {
    PaybtnRef.current.disabled = false;
  }
}


  return (
    <div className='PayStripeMain'>
      <div className='payStripeContainer'>
        <Elements stripe={StripePromise}>
        <div className='CardNumber'>
            <AiFillCreditCard size={30} />
            <CardNumberElement />
        </div>

        <div className='CardCvv'>
          <MdVpnKey size={30} />
          <CardCvcElement />

        </div>

        <div className='CardExpiry'>
         <BsFillCalendarEventFill size={30} />
         <CardExpiryElement />
        </div>

        <div>
            <button onClick={sumbithandler} ref={PaybtnRef}>Pay Rs{TotalAmount}</button>
        </div>
        </Elements>
      </div>
    </div>
  )
}

export default PayStripe;