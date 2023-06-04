import {ADD_TO_CART,
    REMOVE_CART_ITEMS,
    ADD_SHIPPING_INFO,
    FAIL_SHIPPING_INFO,
    GET_SHIPPING_INFO
} from '../constants/CartConstants';
import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:5000/api/Products", // replace with your API's base URL
  });

//ADD TO CART
export const addToCart = (id,quantity)=> async(dispatch,getState)=>{

    
        const {data} = await instance.get(`/product/${id}`);
        dispatch({
            type:ADD_TO_CART,
            payload: {
                product: data.product._id,
                name:data.product.name,
                price:data.product.price,
                image:data.product.images[0].url,
                stock:data.product.stock,
                quantity,
            },
        });
        
     localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
}

//REMOVE FROM CART
export const removeFromCart=(id)=>async(dispatch,getState)=>{
    dispatch({
        type:REMOVE_CART_ITEMS,
        payload:id,
    });
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
}

//ADD ShippingInfo
export const AddShippingInfo=(userId,address,city,state,pincode,phoneNo,PlaceType)=>async(dispatch)=>{
    try {
    const Route = `http://localhost:5000/api/ShippingInfo/${userId}`;
    const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
    const {data} = await axios.post(Route,{address,city,state,pincode,phoneNo,PlaceType},config)

        dispatch({
            type:ADD_SHIPPING_INFO,
            payload:data.shippingAddress,
        });     
    } catch (error) {
        dispatch({type:FAIL_SHIPPING_INFO,payload:error.response.data.message});
    }
   
}

//Get ShippingInfo
export const GETShippingInfo=(userId)=>async(dispatch)=>{
    try {
    const Route = `http://localhost:5000/api/ShippingInfo/${userId}`;
    const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
    const {data} = await axios.get(Route,config);

        dispatch({
            type:GET_SHIPPING_INFO,
            payload:data.shippingInfo,
        });     
    } catch (error) {
        dispatch({type:FAIL_SHIPPING_INFO,payload:error.response.data.message});
    }
   
}