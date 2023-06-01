import React from 'react';
import './SimilarProductsContent.css';
import { useNavigate } from 'react-router-dom';


const SimilarProductsContent = ({products}) => {

  const Navigate=useNavigate();

  const ProductClick = (id)=>{
    Navigate(`/ProductDetail/${id}`);
  }
  const description = `${products?.description.split(" ").slice(0,10).join(" ")}....`;
  return (
    <div className='SimilaProductsPageDiv' onClick={()=>ProductClick(products._id)}>
     <div className='SimilarProductsContainerDiv'>
       <div className='SimilarProductsWrapper'>
         
         <div className='SimilarProductsImageDiv'>

           <img src={products?.images[0].url} alt={products.name} />
               </div>
 
         <div className='SimiliarProductsProductInfo'>
            <h3>{products?.name}</h3>
            <p>Starting from <i>{`RS${products?.price}`}</i></p>
            <span className='DESCRIPTION-SIMILARPRODUCTS-PAGE'>{description}</span>
         </div>

       </div>

     </div>

    </div>
  )
}

export default SimilarProductsContent