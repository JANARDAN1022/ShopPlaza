import React from 'react';
import './ProductSlidercontent.css';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';


const ProductSliderContent = ({product}) => {
 const Navigate = useNavigate();
 const {loading} = useSelector((state)=>state.products);

const ProductClick = (id)=>{
  Navigate(`/similar/${id}`)
}

  const desc = product.description.split(" ").slice(0,2).join(" ");
  
  
  return (
         <div className="ProductsSlideContent" >
        
        <div className="ProductSlidecontainer" onClick={()=>{
          if(!loading){
          ProductClick(product._id)
          }  
        }}>
        {loading?
        <Skeleton height='120px' width={180} animation='wave' variant='rectangular' />
        :
        <div className="image">
          <img  src={product?.images[0]?.url} alt={product?.name} loading='lazy' /> 
        </div>
           }
        <div className="ProductSlideinfo">
        {loading?
        <Skeleton height='18px' width='150px' animation='wave' variant='rectangular' />
        :
        <span className='ProductTitle'>{product?.name}</span>
            } 
             {loading?
        <Skeleton height='16px' width='130px' sx={{alignSelf:'center'}} animation='wave' variant='rectangular' />
        :
        <span className='ShopNow'>Starting From <span style={{color:'rgb(21,207,21)',background:'whitesmoke'}}>Rs{product?.price}</span></span>
             }
                   {loading?
        <Skeleton height='16px' width='130px' sx={{alignSelf:'center'}} animation='wave' variant='rectangular' />
        :
       <span className='ProductInfoText'>{desc}...</span>
                   } 
       </div>
        </div>
       
       </div>
  )
}

export default ProductSliderContent