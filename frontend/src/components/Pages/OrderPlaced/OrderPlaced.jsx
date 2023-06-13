import React from 'react';
import './OrderPlaced.css';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
const OrderPlaced = () => {
  const Navigate = useNavigate();
  return (
    <div className='OderPlacePage'>
     <div className='OrderPlaceContainer'>
       <div className='OrderPlacedHead'>
         <span>OrderPlaced</span>
         <span>Successfully</span>
       </div>
       <div className='ThanksMessage'>
         <span>Thank You For</span>
         <span>Ordering</span>
       </div>
       <div className='ContinueShopping'>
       <span onClick={()=>Navigate('/')}>Continue Shopping</span>
         <AiOutlineArrowRight size={30} onClick={()=>Navigate('/')}/>
        
       </div>
     </div>
    </div>
  )
}

export default OrderPlaced