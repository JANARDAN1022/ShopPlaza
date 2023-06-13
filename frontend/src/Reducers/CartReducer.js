import {ADD_TO_CART,
   GET_CART_ITEMS,
    FAILED_CART,
    UPDATE_QUANTITY,
    REMOVE_CART_ITEMS
} from '../constants/CartConstants';


export const CartReducer = (state = {cartItems: []},action)=>{
    switch (action.type) {
  

        case ADD_TO_CART:
            const existingItem = state.cartItems.find((item) => item.ItemId === action.payload.ItemId);
            if(existingItem){
                return{
                    ...state,
                  
                    cartItems:state.cartItems.map((item) =>
                    item.ItemId === action.payload.ItemId ? action.payload : item
                  )
                    
                }
            }else{
            return{
            ...state,
         
            cartItems:[action.payload,...state.cartItems]
           }
        }
        case GET_CART_ITEMS:
                return{
                    ...state,
                    cartItems:action.payload
                }
        case UPDATE_QUANTITY:
            return{
                ...state,
                cartItems: state.cartItems.map((item) =>
                item.ItemId === action.payload.ItemId ? { ...item, quantity: action.payload.quantity } : item
              ),
            }
        case REMOVE_CART_ITEMS:
            return{
                ...state,
                cartItems: state.cartItems.filter((i)=>
                i._id !== action.payload)
            }
        
                case FAILED_CART:
                    return{
                        ...state,
                        cartItems:[],
                      
                        error:action.payload.error
                    }
    
        default:
          return  state;
    }
}