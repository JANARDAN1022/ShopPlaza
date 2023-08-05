import {ADD_TO_CART,
    REMOVE_CART_ITEMS,
    FAILED_CART,
    GET_CART_ITEMS,
    UPDATE_QUANTITY
} from '../constants/CartConstants';
import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:5000/api/Cart", // replace with your API's base URL
  });

//ADD TO CART
export const addToCart = (userId,ItemId,name,imgUrl,price,quantity,stock,SellerInfo)=> async(dispatch)=>{
    try {
        
   //  dispatch({type:REQ_ADD_TO_CART});    

        const Route = `/CartItems/${userId}`;
        const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
        const {data} = await instance.post(Route,{ItemId,name,imgUrl,price,quantity,stock,SellerInfo},config);
        dispatch({
            type:ADD_TO_CART,
            payload: data.CartItem,
        });
    }catch (error){
        dispatch({type:FAILED_CART,payload:error});
    }    
}

//GET CART ITEMS
export const GETCartitems = (id)=>async(dispatch)=>{
try {
    const Route = `/CartItems/${id}`;
    const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
    const {data} = await instance.get(Route,config);

    dispatch({
        type:GET_CART_ITEMS,
        payload:data.cartItems,
    })
} catch (error) {
    dispatch({type:FAILED_CART,payload:error});
}
}

//Update Quantity
export const UpdateQuantity=(id,quantity)=>async(dispatch)=>{
    try {
        const Route = `/CartItems/${id}`;
        const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
        const {data} = await instance.put(Route,{quantity},config);

        dispatch({
         type:UPDATE_QUANTITY,
         payload:{ ItemId: data.updatedItem.ItemId, quantity: data.updatedItem.quantity },
        })

    } catch (error) {
        dispatch({type:FAILED_CART,payload:error});
    }
}



//REMOVE FROM CART
export const removeFromCart=(id)=>async(dispatch)=>{
   try {
    const Route = `/CartItems/${id}`;
    const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
    
    await instance.delete(Route,config);

    dispatch({
        type:REMOVE_CART_ITEMS,
        payload:id
    })
   } catch (error) {
    dispatch({type:FAILED_CART,payload:error});
   }
 }




