import React, { useEffect,useState } from 'react';
import CategoryPageContent from './CategoryPageContent';
import CategoryCommon from '../../Categories/CommonCategory/CategoryCommon';
import { useParams } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import {getCategories} from '../../../Actions/ProductAction';
import Pagination from '@mui/material/Pagination';




const CategoryPage = () => {
const {category} = useParams();
 const dispatch = useDispatch();
 const [currentPage,setcurrentPage]=useState(1);

 //const {products} = useSelector(state => state.products.categories);
 
 const {categories} = useSelector(state => state.products);
 const products = categories && categories.products;
const  productcount = categories && categories.productcount 

const totalPages = Math.ceil(productcount/8);

 
 


 

 useEffect(()=>{
   dispatch(getCategories(category,currentPage));
 },[dispatch,category,currentPage]);


  return (
    <div className='CategoryPageMainDiv mt-20'>
      <CategoryCommon />
      <div className='CategoryPageHead'>
       <p>{category}<br /><span className='ITEMCOUNT'>{productcount}items</span></p>
     </div>

      
        <div className='CategoryPageProducts'>
        {products && products.map((products)=>(
          <CategoryPageContent products={products} key={products._id} />
        ))
        }
        </div>
        <Pagination 
      count={totalPages?totalPages: -1} color="primary"
       className='CategoryPagination'
       page={currentPage}
       onChange={(e,value)=>setcurrentPage(value)}
      />
      
    </div>
  )
}

export default CategoryPage