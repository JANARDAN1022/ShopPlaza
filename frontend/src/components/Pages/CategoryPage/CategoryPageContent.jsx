import React from 'react';
import './categorycontent.css';
import { useNavigate } from 'react-router-dom';

const CategoryPageContent = ({products}) => {
  const Navigate = useNavigate();
  const ProductClick = (id)=>{
    Navigate(`/ProductDetail/${id}`);
  }

  const desc = products?.description?.split(" ").slice(0,10).join(" ");
  return (
    <div className='MainCategoryPageDiv' onClick={()=>ProductClick(products?._id)}>
     <div className='CategoryPageProductsDiv'>
       <div className='CategoryPageProductsWrapper'>
         
         <div className='CategoryPageProductsImageDiv'>

           <img src={products?.images[0]?.url} alt={products?.name} />
               </div>
 
         <div className='CategoryPageProductsProductInfo'>
            <span className='ProductNameHead'>{products?.name}</span>
            <span className='PRICEinfo'>Starting from {`RS${products?.price}`}</span>
            <span className='DESCRIPTIONcategoryPage'>{desc}...</span>
         </div>

       </div>

     </div>

    </div>
  )
}

export default CategoryPageContent