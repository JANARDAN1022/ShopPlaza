import {ADD_TO_CART,REMOVE_CART_ITEMS} from '../constants/CartConstants';


export const CartReducer = (state = {cartItems: []},action)=>{
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
            
    
        default:
          return  state;
    }
}