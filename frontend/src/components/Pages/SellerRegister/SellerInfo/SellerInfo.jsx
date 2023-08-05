import React, { useContext, useRef, useState } from 'react';
import './SellerInfo.css';
//import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineLine } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import {RegisterSeller} from '../../../../Actions/SellerAction';
import {useDispatch,useSelector} from 'react-redux';
import {SellerContext} from '../../../../Context/SellerContext';

const SellerInfo = () => {
  const [SellerData,setSellerData]=useState({
    Name:'',
    PhoneNo:'',
    BusinessName:'',
    BusinessAddress:'',
    PaymentMethod:'',
  })
  const [Error,setError]=useState({
    PersonalError:'',
    BuisnessError:'',
    PaymentError:''
  });

  const PersonalNameRef = useRef();
  const PersonalPhoneRef = useRef();
  const BuisnessNameRef = useRef();
  const BuisnessaddressRef = useRef();
  const {user} = useSelector(state=>state.user);
  const Dispatch = useDispatch();
  const {SellerEmail,Category,SellerPassword,setAlreadySeller} = useContext(SellerContext);
  const Navigate = useNavigate();
  const UserId = user?._id;


  const HandleCreateSellerAC = async()=>{
    if(SellerData.Name==='' && SellerData.PhoneNo===''){
      PersonalNameRef.current.focus();
      PersonalNameRef.current.style.outlineColor='red';
         setError({...Error,PersonalError:'Please Enter Your Personal Information *'});
         setTimeout(() => {
          setError('');
         }, 3000);
    }else
    if(SellerData.Name===''){
      PersonalNameRef.current.focus();
      PersonalNameRef.current.style.outlineColor='red';
      setError({...Error,PersonalError:'Please Enter Your Full Name *'});
      setTimeout(() => {
       setError('');
      }, 3000);
    }else
    if(SellerData.PhoneNo===''){
      PersonalPhoneRef.current.focus();
      PersonalPhoneRef.current.style.outlineColor='red';
      setError({...Error,PersonalError:'Please Enter Your Phone Number *'});
      setTimeout(() => {
       setError('');
      }, 3000);
    }else
    if(SellerData.BusinessName==='' && SellerData.BusinessAddress===''){
      BuisnessNameRef.current.focus();
      BuisnessNameRef.current.style.outlineColor='red';
      setError({...Error,BuisnessError:'Please Enter Your Buisness Information *'});
      setTimeout(() => {
       setError('');
      }, 3000);
    }else
    if(SellerData.BusinessName===''){
      BuisnessNameRef.current.focus();
      BuisnessNameRef.current.style.outlineColor='red';
      setError({...Error,BuisnessError:'Please Enter Your Buisness Name *'});
      setTimeout(() => {
       setError('');
      }, 3000);
    }else
    if(SellerData.BusinessAddress===''){
      BuisnessaddressRef.current.focus();
      BuisnessaddressRef.current.style.outlineColor='red';
      setError({...Error,BuisnessError:'Please Enter Your Buisness Address *'});
      setTimeout(() => {
       setError('');
      }, 3000);
    }else
    if(SellerData.PaymentMethod===''){
      setError({...Error,PaymentError:'Please Select A Recieving Payment Method *'});
      setTimeout(() => {
       setError('');
      }, 3000);
    }else{
    const Register = await  Dispatch(RegisterSeller(UserId,SellerEmail,Category,SellerPassword,SellerData.Name,SellerData.PhoneNo,SellerData.BusinessName,SellerData.BusinessAddress,SellerData.PaymentMethod));
     if(Register.Success===true){
      Navigate('/DashBoard');
      setAlreadySeller(true);
     }else{
      console.log('Error');
     }
    }
  }
  return (
    <div className='SellerInfoMain'>
      <div className='SellerInfoContainer'>

<div className="SellerInfoStageContainer">
          <div className="SellerInfoNavLeft">
            <h3>
              <Link to="/">
                <i>ShopPlaza</i>
              </Link>{" "}
            </h3>
          </div>
          <div className="SellerInfoStage">
            <div className="SellerInfoEmailStage">
              <BsCheckCircle size={20} />
              <span>Email & Category Selection</span>
            </div>

            <div className="Dash">
              <AiOutlineLine size={30} />
            </div>

            <div className="SellerInfoPasswordStage">
              <BsCheckCircle size={20} />
              <span>Password Creation</span>
            </div>

            <div className="Dash">
              <AiOutlineLine size={30} />
            </div>

            <div className="SellerInfoDashBoardStage">
              <BsCheckCircle size={20} /> 
              <span>OnBoarding-DashBoard</span>
            </div>
          </div>
        </div>

        <div className='SellerInfoContent'>
          <div className='SellerPersonalInfo'>
            <div className='SellerPersonalInfoHead'>
           <h3>Personal Information</h3>
           </div>
           <div className='PersonalInfoInputs'>
            <div className='NameInputsSeller'>
            <span>Full Name :</span>
               <input ref={PersonalNameRef} value={SellerData.Name} onChange={(e)=>setSellerData({...SellerData,Name:e.target.value})} name='SellerName' type='text' placeholder='Full Name' />
            </div>
            <div className='SellerPhoneInput'>
              <span>Phone Number :</span>
               <input ref={PersonalPhoneRef} value={SellerData.PhoneNo} onChange={(e)=>setSellerData({...SellerData,PhoneNo:e.target.value})} name='SellerPhoneNo' type='text' placeholder='Mobile Number'/>
           </div>
           </div>
          </div>

          <div className='SellerBuisnessInfo'>
            <div className='SellerBuisnessHead'>
            <h3>Business Information</h3>
            </div>

            <div className='BuisnessInfoSeller'>
               <div className='BuisnessName'>
               <span>Business Name :</span>
               <input ref={BuisnessNameRef} type='text' value={SellerData.BusinessName} onChange={(e)=>setSellerData({...SellerData,BusinessName:e.target.value})} name='BuisnessName' placeholder='Your Buisness Name' />
               </div>
               <div className='BuisnessAddress'>
               <span>Business Address :</span>
               <input ref={BuisnessaddressRef} value={SellerData.BusinessAddress} onChange={(e)=>setSellerData({...SellerData,BusinessAddress:e.target.value})} type='text' placeholder='Sector / Plot No / Building Name / Floor / City.....' name='Buisness Address' />
               </div>
            </div>

          </div>

          <div className='SellerPaymentInfo'>
           <div className='SellerPaymentHead'>
           <h3>Payment Recieving Method</h3>
           </div>

           <div className='RecievingMethods'>
            <div style={{backgroundColor:SellerData.PaymentMethod==='Stripe'?'rgba(40, 116, 240,0.2)':''}} className='StripeRecieving' onClick={()=>setSellerData({...SellerData,PaymentMethod:'Stripe'})}>
            <span >Stripe</span>
            </div>
            <div style={{backgroundColor:SellerData.PaymentMethod==='Cash on Delievery'?'rgba(40, 116, 240,0.2)':''}} className='CashRecieving' onClick={()=>setSellerData({...SellerData,PaymentMethod:'Cash on Delievery'})}>
             <span>Cash On Delievery</span>
            </div>
            <div style={{backgroundColor:SellerData.PaymentMethod==='Both Applicable'?'rgba(40, 116, 240,0.2)':''}} className='BothMethodRecieving' onClick={()=>setSellerData({...SellerData,PaymentMethod:'Both Applicable'})}>
           <span>Both Methods Applicable</span>
            </div>
           </div>
          </div>
        </div>
        <div className='ErrosDisplay'>
          <div className='SpecificERRORS'>
          <span style={{display:Error.PersonalError!==''?'':'none'}}>{Error.PersonalError}</span>
          </div>
          <div className='SpecificERRORS'>
          <span style={{display:Error.BuisnessError!==''?'':'none'}}>{Error.BuisnessError}</span>
          </div>
          <div className='SpecificERRORS'>
          <span style={{display:Error.PaymentError!==''?'':'none'}}>{Error.PaymentError}</span>
         </div>
        </div>
    
        <button className='CreateSellerACBtn' onClick={HandleCreateSellerAC}>Confirm & Create Seller Account</button>

     </div>
    </div>
  )
}

export default SellerInfo;