import React, { useEffect, useState } from 'react';
import './Cart.css';
import {useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {removeFromCart,GETCartitems,UpdateQuantity} from '../../../Actions/CartAction';
import { GETShippingInfo } from '../../../Actions/ShippingAction';
import { Icon } from 'react-icons-kit';
import {ic_clear} from 'react-icons-kit/md/ic_clear';
import {ic_remove_shopping_cart} from 'react-icons-kit/md/ic_remove_shopping_cart';


const Cart = () => {
  const [confirmRemove,setconfirmRemove]=useState(false);
  const [confirmId,setconfirmId]=useState(null);
  const Navigate = useNavigate();


const dispatch = useDispatch();
const {cartItems}=useSelector(state=>state.cart);
const {user} = useSelector(state=>state.user);
const userid = user?._id;
console.log(cartItems);
useEffect(()=>{
  if(userid){
  dispatch(GETCartitems(userid));
  dispatch(GETShippingInfo(userid));
  }
 },[dispatch,userid])


const handleIncreaseQuantity = (id,quantity,stock)=>{
 
  const newQty = quantity + 1;
  if(stock <= quantity){
    return;
  }
dispatch(UpdateQuantity(id,newQty));
}

const handleDecreaseQuantity = (id,quantity)=>{
  const newQty = quantity - 1;
  if(quantity===1){
    return;
  }
dispatch(UpdateQuantity(id,newQty));
}

const handleRemove = (id)=>{
  setconfirmRemove(false);
  dispatch(removeFromCart(id));
}

const checkoutHandler = ()=>{
  Navigate(`/Login?redirect=Checkout`)
}




  return (
    <div className='CartMain' >
        <div className='CartContainer' style={{filter:confirmRemove?'blur(3px)':''}} >

     <div className='CartLeft' >

     <div className='CartHead'>
     <h1>Products</h1>
     </div>

     {cartItems?.length<1?
    <div className='NoProductsInCart'>
    <div className='NoProductsContainer'>
        <Icon icon={ic_remove_shopping_cart} size={90}  className='EmptyCartIcon'/>
        <h3>No Products In Your Cart</h3>
    </div>
    </div> 
    :
      
     <div className='CartProductsContainer' >
     {cartItems && cartItems.map((item)=>(
     <div className='CartItemsContainer' style={{pointerEvents:confirmRemove?'none':''}}  key={item?.ItemId}>
     <div className='CartProducts'>
       <div className='CartProductImage' >
        <img src={item?.imgUrl} alt='Product' />
       </div>

       <div className='ProductInfo'>
         <div className='ProductName'>
         <span>{item?.name}</span>
         </div>

         <div className='ProductPrice'>
            <span>Rs{item?.price * item?.quantity}</span>
         </div>

         <div className='ProductQuantity'>
            <div className='MinusQuantity' style={{display:item?.quantity===1?'none':''}}>
            <span onClick={(e)=>{
              e.preventDefault();
              handleDecreaseQuantity(item?._id,item?.quantity)}}>-</span>
           </div>
           <div className='QuantityInput'>
           <input type='text' name='itemquantity' readOnly value={item?.quantity} style={{paddingLeft:item?.quantity<10?'5px':'2px',paddingRight:item?.quantity<10?'0px':'3px' }}/>
          </div>
          <div className='PlusQuantity' style={{display:item?.quantity===item?.stock?'none':''}}>
          <span onClick={()=>handleIncreaseQuantity(item?._id,item?.quantity,item?.stock)} >+</span>
          </div>
         </div>

       </div>
     </div>
     
     <div className='RemoveProduct'>
     <button onClick={()=>{setconfirmRemove(true); setconfirmId(item?._id)}}>Remove</button>
    </div>
    </div>
            ))}


            </div>

     }

     <div className='PlaceOrder' style={{display:cartItems?.length<1?'none':''}}>
     <button onClick={checkoutHandler}>Proceed To Checkout</button>
     </div>

     </div>


      <div className='CartRight'>

        <div className='PriceDetailsHead'>
        <span>PRICE DETAILS</span>
        </div>
          
          <div className='PriceDetails'>
            <div className='ItemsTotal'>
           <span>Price{`(${cartItems?.length} items)`}</span>
           <span>{`Rs${cartItems?.reduce(
              (acc,item)=> acc + item.quantity * item.price,0
           )}`}</span>
                     </div>

          <div className='DiscountInfo'>
           <span>Discount</span>
           <span>-</span>
          </div>

          <div className='DeliveryCharges'>
          <span>Delivery Charges</span>
           <span>-</span>
          </div>

          <div className='TotalAmount'>
            <span>Total Amount</span>
            <span>{`Rs${cartItems?.reduce(
              (acc,item)=> acc + item.quantity * item.price,0
           )}`}</span>
          </div>

          </div>
      </div>
  
  
   </div>
   <div className='ConfirmRemove' style={{display:confirmRemove?'flex':'none'}}>
    <Icon icon={ic_clear} size={30} className='closeConfirm' onClick={()=>{setconfirmRemove(false); setconfirmId(null)}}/>
      <h3>Remove Item</h3>
      <p>Are you sure you want to remove this item?</p>
      <div className='ConfirmRemoveButtons'>
        <button className='CancelConfirm' onClick={()=>{setconfirmRemove(false); setconfirmId(null)}}>Cancel</button>
        <button className='ConfirmBtn' onClick={()=>handleRemove(confirmId)}>Remove</button>
      </div>
     </div>
  
    </div>
  )
}

export default Cart