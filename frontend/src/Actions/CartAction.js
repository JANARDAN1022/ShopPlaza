import {ADD_TO_CART,REMOVE_CART_ITEMS} from '../constants/CartConstants';
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