import {
  DELETE_SELLER,
  SELLER_REGISTER_FAIL,
  SELLER_REGISTER_REQUEST,
  SELLER_REGISTER_SUCCESS,
} from "../constants/SellerConstants";


export const SellerReducer = (state={SellerInfo:{}},action)=>{
    switch (action.type) {
        case SELLER_REGISTER_REQUEST:
            return {
                loading:true,
                SellerInfo:null
            }
        case SELLER_REGISTER_SUCCESS:
            return{
                ...state,
                loading:false,
                SellerInfo:action.payload
            }
        case SELLER_REGISTER_FAIL:
            return{
                ...state,
                loading:false,
                SellerInfo:null,
                error:action.payload
            }
        case DELETE_SELLER:
            return{
                ...state,
                SellerInfo:null,
            }
            
        
    
        default:
           return state;
    }
}