import {
   //  REQ_ADD_SHIPPINGINFO,
     ADD_SHIPPING_INFO,
     FAIL_SHIPPING_INFO,
     GET_SHIPPING_INFO,
     FAIL_GET_SHIPPING_INFO,
     DELETE_SHIPPINGINFO
   //  REQ_GET_SHIPPINGINFO
} from '../constants/ShippingConstants';






export const ShippingReducer = (state ={shippingInfo:[]},action)=>{
switch(action.type){
         

                case ADD_SHIPPING_INFO: 
                    return {
                      ...state,
                      shippingInfo: [action.payload,...state.shippingInfo]
                    };
                

            case FAIL_SHIPPING_INFO:
                case FAIL_GET_SHIPPING_INFO:
                return{
                    ...state,
                    shippingInfo:[],
                    error:action.payload.error
                }
            case GET_SHIPPING_INFO:
                return{
                    ...state,
                    shippingInfo:action.payload
                }
              
            case DELETE_SHIPPINGINFO :
              return {
                ...state,
                shippingInfo: state.shippingInfo.filter((info)=>info._id!==action.payload)
              }
            
    
        default:
          return  state;

 }
}

