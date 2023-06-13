import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { ProductDetailsReducer, ProductReducer} from './Reducers/ProductReducer';
import { CartReducer } from './Reducers/CartReducer';
import { Userreducer } from './Reducers/UserReducer';
import {ShippingReducer} from './Reducers/ShippingReducer';



const reducer = combineReducers({
    products:ProductReducer,
    productDetails:ProductDetailsReducer,
    cart:CartReducer,
    user:Userreducer,
    ShippingInfo:ShippingReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;