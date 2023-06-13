import React from 'react';
import './ProductSlidercontent.css';
import { useNavigate } from 'react-router-dom';
/*import {getCategories} from '../../../Actions/ProductAction'
import {useDispatch,useSelector} from 'react-redux'*/


const ProductSliderContent = ({product}) => {
 const Navigate = useNavigate();
const ProductClick = (id)=>{
  Navigate(`/similar/${id}`)
}

  const desc = product.description.split(" ").slice(0,2).join(" ");
  
  
  return (
         <div className="ProductsSlideContent" >
        
        <div className="ProductSlidecontainer" onClick={()=>ProductClick(product._id)}>
        <div className="image">
          <img  src={product?.images[0]?.url} alt={product?.name} loading='lazy' /> 
        </div>

        <div className="ProductSlideinfo">
        <span className='ProductTitle'>{product?.name}</span>
          <span className='ShopNow'>Starting From <span style={{color:'rgb(21,207,21)',background:'whitesmoke'}}>Rs{product?.price}</span></span>
       <span className='ProductInfoText'>{desc}...</span>
        </div>
        </div>
       
       </div>
  )
}

export default ProductSliderContent