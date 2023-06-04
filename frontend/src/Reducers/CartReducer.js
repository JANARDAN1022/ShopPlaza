import {ADD_TO_CART,
    REMOVE_CART_ITEMS,
    ADD_SHIPPING_INFO,
    FAIL_SHIPPING_INFO,
    GET_SHIPPING_INFO
} from '../constants/CartConstants';


export const CartReducer = (state = {cartItems: [],shippingInfo:[]},action)=>{
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const itemexists = state.cartItems.find((i)=>i.product === item.product)

            if(itemexists){
                return {
                    ...state,
                    cartItems: state.cartItems.map((i)=>
                    i.product === itemexists.product?item:i)
                }
            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems,item],
                };
            }

            case REMOVE_CART_ITEMS:
                return{
                    ...state,
                    cartItems: state.cartItems.filter((i)=>i.product !== action.payload)
                }


            case ADD_SHIPPING_INFO:
                return{
                    ...state,
                    shippingInfo:[...state.shippingInfo,action.payload]
                }

            case FAIL_SHIPPING_INFO:
                return{
                    ...state,
                    shippingInfo:[],
                    error:action.payload.error
                }
            case GET_SHIPPING_INFO:
                return{
                    ...state,
                    shippingInfo:[...state.shippingInfo,action.payload]
                }
            
    
        default:
          return  state;
    }
}