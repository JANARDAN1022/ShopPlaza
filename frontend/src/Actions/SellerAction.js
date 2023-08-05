import {
  //DELETE_SELLER,
  SELLER_REGISTER_FAIL,
  SELLER_REGISTER_REQUEST,
  SELLER_REGISTER_SUCCESS,
} from "../constants/SellerConstants";
import axios from "axios";

//Base Url
const instance = axios.create({
  baseURL: "http://localhost:5000/api/BecomeSeller",
});

//Register As Seller
export const RegisterSeller =
  (
    UserId,
    SellerEmail,
    SellingCategory,
    SellerPassword,
    FullName,
    PhoneNo,
    BuisnessName,
    BuisnessAddress,
    PaymentMethod
  ) =>
  async (dispatch) => {
    try {
        dispatch({type:SELLER_REGISTER_REQUEST});

        const Route = `/RegisterSeller/${UserId}`;
        //const config =  {headers:{"Content-Type":"application/json"},withCredentials: true};
        const {data} = await instance.post(Route,
            { SellerEmail,
            SellingCategory,
            SellerPassword,
            FullName,
            PhoneNo,
            BuisnessName,
            BuisnessAddress,
            PaymentMethod});
        dispatch({type:SELLER_REGISTER_SUCCESS,payload:data.NewSeller});
        return {
            Success:true
        }
    } catch (error) {
        dispatch({type:SELLER_REGISTER_FAIL,payload:error});
    }
  };
