import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../ProductDetails/SimilarProducts/SimilarProducts.css';


const ProductsContent = ({products}) => {
  const Navigate = useNavigate();
  const ProductClick = (id)=>{
    Navigate(`/ProductDetail/${id}`);
  } 

  const description = `${products?.description.split(" ").slice(0,10).join(" ")}....`;
  return (
    <div className='SimilaProductsPageDiv' onClick={()=>ProductClick(products?._id)}>
     
       <div className='SimilarProductsWrapper'>
         
         <div className='SimilarProductsImageDiv'>

           <img src={products?.images[0].url} alt={products?.name} />
               </div>
 
         <div className='SimiliarProductsProductInfo'>
            <h3>{products?.name}</h3>
            <p>Starting from <span className='PriceTag'>{`RS${products?.price}`}</span></p>
            <span className='DESCRIPTION-SIMILARPRODUCTS-PAGE'>{description}</span>
         </div>

       </div>

     

    </div>
  )
}

export default ProductsContent