import axios from 'axios';
import { 
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    ALL_CATEGORIES_FAIL,
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    ALL_SIMILARCATEGORIES_FAIL,
    ALL_SIMILARCATEGORIES_REQUEST,
    ALL_SIMILARCATEGORIES_SUCCESS,
    CLEAR_ERRORS } from "../constants/Productonstants";
 
    const instance = axios.create({
      baseURL: "http://localhost:5000/api/products", //API's base URL
    });

export const GetProducts = (keyword="",price=[0,100000],minRating=0,currentPage=1)=> async (dispatch)=>{
try {
    dispatch({type:ALL_PRODUCT_REQUEST});
    //let route = `/?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${minRating}`
  
   
     let route=`?&keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${minRating}&page=${currentPage}`

   const {data} = await instance.get(route);
   // const {Data} = await axios.get('/api/v1/products');
   
   
    dispatch({
        type:ALL_PRODUCT_SUCCESS,
        payload:data
    })
} catch (error) {
    dispatch({
        type:ALL_PRODUCT_FAIL,
        payload:error.message,
    })
}
}

export const getCategories = (category,currentPage) => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORIES_REQUEST });

    const route = `/category/${category}?page=${currentPage}`
    const { data } = await instance.get(route);

    dispatch({
      type: ALL_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CATEGORIES_FAIL,
      payload: error.message,
    });
  }
};

export const getSimilarProducts = (productId,price=[0,100000],minRating) => async (dispatch) => {
  try {
    dispatch({ type: ALL_SIMILARCATEGORIES_REQUEST });
    const route = `/similar/${productId}?price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${minRating}`
    const { data } = await instance.get(route);

    dispatch({
      type: ALL_SIMILARCATEGORIES_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: ALL_SIMILARCATEGORIES_FAIL,
      payload: error.message,
    });
  }
};


export const clearErrors =(dispatch)=>{
 dispatch({type:CLEAR_ERRORS});
}
export const GetProductsDetails =(id)=> async (dispatch)=>{
        try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data} = await instance.get(`/product/${id}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.message,
        })
    }
}

  








