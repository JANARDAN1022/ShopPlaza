import {
ADD_SHIPPING_INFO,
FAIL_SHIPPING_INFO,
GET_SHIPPING_INFO,
FAIL_GET_SHIPPING_INFO,
DELETE_SHIPPINGINFO,
UPDATE_SHIPPINGINFO,
UPDATE_FAIL_SHIPPINGINFO
//REQ_ADD_SHIPPINGINFO,
//REQ_GET_SHIPPINGINFO
} from '../constants/ShippingConstants';

import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:5000/api", // replace with your API's base URL
  });


//ADD ShippingInfo
export const AddShippingInfo=(userId,address,city,state,pincode,phoneNo,email,PlaceType)=>async(dispatch)=>{
    try {
    // dispatch({type:REQ_ADD_SHIPPINGINFO});

    const Route = `/ShippingInfo/${userId}`;
    const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
    const {data} = await instance.post(Route,{address,city,state,pincode,phoneNo,email,PlaceType},config)
   
    dispatch({
        type: ADD_SHIPPING_INFO,
        payload: data.ShippingAddress,
      });
    } catch (error) {
        dispatch({type:FAIL_SHIPPING_INFO,payload:error});
    }
   
}

//Get ShippingInfo
export const GETShippingInfo=(userId)=>async(dispatch)=>{
    try {
   // dispatch({type:REQ_GET_SHIPPINGINFO});

    const Route = `/ShippingInfo/${userId}`;
    const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
    const {data} = await instance.get(Route,config);

        dispatch({
            type:GET_SHIPPING_INFO,
            payload:data.shippingInfo,
        });     
    } catch (error) {
        dispatch({type:FAIL_GET_SHIPPING_INFO,payload:error});
    }
   
}

//DELETE ShippingInfo
export const DeleteShippingInfo=(Id)=>async(dispatch)=>{
    try {
   // dispatch({type:REQ_GET_SHIPPINGINFO});

    const Route = `/ShippingInfo/${Id}`;
    const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
     await instance.delete(Route,config);

        dispatch({
            type:DELETE_SHIPPINGINFO,
            payload:Id,
        });     
    } catch (error) {
        dispatch({type:FAIL_GET_SHIPPING_INFO,payload:error});
    }
   
}

//Update ShippingInfo
export const UpdateShippingInfo = (Id,address,state,city,email,phoneNo,pincode,PlaceType)=>async(dispatch)=>{
    try {
        const Route = `/ShippingInfo/${Id}`
        const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
        const {data} = await instance.put(Route,{address,state,city,email,phoneNo,pincode,PlaceType},config);

        dispatch({
            type:UPDATE_SHIPPINGINFO,
            payload:{
                id:Id,
                Info:data.UpdatedInfo,
            }
        })
        
    } catch (error) {
        dispatch({type:UPDATE_FAIL_SHIPPINGINFO,payload:error});
    }
}