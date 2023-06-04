import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { ProductDetailsReducer, ProductReducer} from './Reducers/ProductReducer';
import { CartReducer } from './Reducers/CartReducer';
import { Userreducer } from './Reducers/UserReducer';


const reducer = combineReducers({
    products:ProductReducer,
    productDetails:ProductDetailsReducer,
    cart:CartReducer,
    user:Userreducer,
});

let initialState = {
    cart:{
        cartItems: localStorage.getItem("cartItems")?
        JSON.parse(localStorage.getItem("cartItems"))
        :
        [],
        shippinInfo:localStorage.getItem("shippinInfo")?
        JSON.parse(localStorage.getItem("shippingInfo"))
        :
        []
    }
};

const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;