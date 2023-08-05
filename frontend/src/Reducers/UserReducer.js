import {
    LOGIN_REQUEST,
    LOAD_FAIL,
    LOGIN_SUCCESS,
   CLEAR_ERRORS,
    LOAD_REQUEST,
    LOAD_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    Update_FAIL,
    Update_SUCCESS
} from '../constants/UserConstants';


export const Userreducer = (state={user: {}},action)=>{
    switch (action.type){
        case LOGIN_REQUEST:
            case REGISTER_REQUEST:
                case LOAD_REQUEST:
                   
            return {
                loading: true,
                isAuthenticated:false,
            };
           
            case LOGIN_SUCCESS:
                case REGISTER_SUCCESS:
                    case LOAD_SUCCESS:
                        case Update_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    isAuthenticated:true,
                    user: action.payload,
                };

                

               
                    
            case LOGIN_FAIL:
                case REGISTER_FAIL:
                return{
                    ...state,
                    loading:false,
                    isAuthenticated:false,
                    user:null,
                    error:action.payload,
                };

                case LOAD_FAIL:
                    return{
                        loading:false,
                        isAuthenticated:false,
                        user:null,
                        error:action.payload,
                    }

                  

                case LOGOUT_SUCCESS:
                    return{
                        loading:false,
                        user:null,
                        isAuthenticated:false,
                    }
                case LOGOUT_FAIL:
                    case Update_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload,
                    }

                case CLEAR_ERRORS:
                    return {
                            ...state,
                            error:null
                            }

                default:
                    return state;
    }
}