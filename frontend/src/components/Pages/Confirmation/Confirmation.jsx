import {React,useContext,useState} from 'react';
import './Confirmation.css';
import {BsCheckAll,BsStripe} from 'react-icons/bs';
import { TbCash } from "react-icons/tb";
import {CheckoutContext} from '../../../Context/CheckoutContext';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import '../Payment/Payment.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const {selectedAddress,paymentMethod} = useContext(CheckoutContext);
  const {user} = useSelector(state=>state.user);
  const [rotate, setrotate] = useState(false);
  const Navigate = useNavigate();

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
        <span onClick={()=>Navigate('/Checkout')}>Edit</span>
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
          <span>{selectedAddress?.address}</span>
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

        <div className='PlaceOrderButton'>
          <button onClick={()=>{
            if(paymentMethod==='Cash'){
              Navigate('/orderPlaced')
            }else{
              Navigate('/process/payment');
            }
          }}>Place Order</button>
        </div>


      </div>
    </div>
  )
}

export default Confirmation