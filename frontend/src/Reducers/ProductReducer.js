import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
 PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL, 
  ALL_CATEGORIES_REQUEST ,
ALL_CATEGORIES_SUCCESS,
ALL_CATEGORIES_FAIL ,
ALL_SIMILARCATEGORIES_FAIL,
ALL_SIMILARCATEGORIES_REQUEST,
ALL_SIMILARCATEGORIES_SUCCESS,
  CLEAR_ERRORS } from "../constants/Productonstants";

export const ProductReducer = (state = {products:[],categories:[]},action)=>{
  switch(action.type){
      case ALL_PRODUCT_REQUEST:
          return {
              loading:true,
              products:[]
          }
      case ALL_PRODUCT_SUCCESS:
          return {
              loading:false,
              products:action.payload.products,
              productcount:action.payload.productcount,
              limit:action.payload.limit
          }
          case ALL_PRODUCT_FAIL:
          return {
              loading:false,
              products:[],
              error:action.payload
          }
          case ALL_CATEGORIES_REQUEST:
            return{
              ...state,
            loading:true,
            categories:[]
            }
           case ALL_CATEGORIES_SUCCESS:
            return {
              ...state,
              loading: false,
              categories: action.payload
              
            }
          case ALL_CATEGORIES_FAIL:
            return{
              ...state,
           loading:false,
           categories:[],
           error:action.payload
            }
            case ALL_SIMILARCATEGORIES_REQUEST:
      return {
        loading:true,
        similarProducts:[]
      }
    case ALL_SIMILARCATEGORIES_SUCCESS:
      return {
        ...state,
        loading:false,
        similarProducts: action.payload,
      }
    case ALL_SIMILARCATEGORIES_FAIL:
      return {
        loading:false,
        similarProducts:[],
        error:action.payload
      }
      case CLEAR_ERRORS:
          return {
                  ...state,
                  error:null
                  }
          default:
              return state;    
  }
  

};
export const ProductDetailsReducer = (state = {product:{}},action)=>{
  switch(action.type){
      case PRODUCT_DETAILS_REQUEST:
          return {
              loading:true,
              ...state,
          }
      case PRODUCT_DETAILS_SUCCESS:
          return {
              loading:false,
              product:action.payload.product,
              
          }
          case  PRODUCT_DETAILS_FAIL:
          return {
              loading:false,
              error:action.payload
          }
      case CLEAR_ERRORS:
          return {
                  ...state,
                  error:null
                  }
          default:
              return state;    
  }
  

};