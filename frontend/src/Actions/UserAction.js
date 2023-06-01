import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
   CLEAR_ERRORS,
    LOAD_REQUEST,
    LOAD_SUCCESS,
     LOAD_FAIL,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    Update_FAIL,
    Update_SUCCESS
} from '../constants/UserConstants';

const instance = axios.create({
    baseURL: "http://localhost:5000/api/users", // API's base URL
  });

export const LoginUser = (email,password)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST});

        const route = `/Login`;
        const config = {headers:{"Content-Type":"application/json"}, withCredentials: true};

        const {data} = await instance.post(route,{email,password},config);

        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user,
        });

    }catch(error){
        dispatch({type:LOGIN_FAIL,payload:error.response.data.message});
    }
}


export const RegisterUser = (FirstName,SecondName,email,password,gender)=>async(dispatch)=>{
    try {
        dispatch({type:REGISTER_REQUEST})
        const route = `/Register`;
        const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};

        const {data}=await instance.post(route,{FirstName,SecondName,email,password,gender},config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:data.user,
        })
    
} catch (error) {
    dispatch({type:REGISTER_FAIL,payload:error.response.data.message});
}


}



export const LoaodUser = ()=>async(dispatch)=>{
    try{
        dispatch({type:LOAD_REQUEST});

        const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};

        const route = `/Me`;
        const {data} = await instance.get(route,config);

        dispatch({
            type:LOAD_SUCCESS,
            payload:data.user,
        });

    }catch(error){
        dispatch({type:LOAD_FAIL,payload:error.response.data.message});
    }
}


export const LogoutUser = ()=>async(dispatch)=>{
    try {
        const route = `/Logout`;
        const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
        await instance.get(route,config);

        dispatch({type:LOGOUT_SUCCESS})
        
    } catch (error) {
        dispatch({type:LOGOUT_FAIL,payload:error.response.data.message})
    }
}



export const clearErrors =(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
   }


   export const PersonalInfoUpdate = (id,FirstName,SecondName,gender)=>async(dispatch)=>{
    try {
        const route = `/Update/${id}`;
        const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};

        const {data} =await instance.put(route,{FirstName,SecondName,gender},config);

        dispatch({type:Update_SUCCESS,payload:data.updatedUser});

    } catch (error) {
        dispatch({type:Update_FAIL,payload:error.response.data.message})
    }
   }

   export const EmailInfoUpdate = (id,email)=>async(dispatch)=>{
    try {
        const route = `/Update/${id}`;
        const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};

        const {data} =await instance.put(route,{email},config);

        dispatch({type:Update_SUCCESS,payload:data.updatedUser});

    } catch (error) {
        dispatch({type:Update_FAIL,payload:error.response.data.message})
    }
   }

   export const PasswordInfoUpdate = (id,currentPassword,newPassword)=>async(dispatch)=>{
    try {
        const route = `/Update/${id}`;
        const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};

        const {data} =await instance.put(route,{currentPassword,newPassword},config);

        dispatch({type:Update_SUCCESS,payload:data.updatedUser});

    } catch (error) {
        dispatch({type:Update_FAIL,payload:error.response.data.message})
    }
   }

   