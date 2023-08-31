import React from 'react';
import './SimilarProductsContent.css';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';


const SimilarProductsContent = ({products,Loaded}) => {

  const Navigate=useNavigate();

  const ProductClick = (id)=>{
    if(Loaded){
    Navigate(`/ProductDetail/${id}`);
    }
  }
  const description = `${products?.description.split(" ").slice(0,10).join(" ")}....`;
  return (
    <>
    <div className='SimilaProductsPageDiv' onClick={()=>ProductClick(products._id)}>
     <div className='SimilarProductsContainerDiv'>
       <div className='SimilarProductsWrapper'>
         
         {!Loaded?
         <Skeleton animation="wave" variant="rectangular" width={200} height={200} />
         :
           <div className='SimilarProductsImageDiv'>
           <img src={products?.images[0].url} alt={products.name} />
            </div>
}
         <div className='SimiliarProductsProductInfo'>
          {!Loaded?
          <Skeleton
          animation="wave"
          height={30}
          width="200px"
          style={{ marginBottom: 6 }}
        />
        :
            <h3>{products?.name}</h3>
          }
            {!Loaded?
          <Skeleton
          animation="wave"
          height={20}
          width="200px"
          style={{ marginBottom: 6 }}
        />
        :
            <p>Starting from <i>{`RS${products?.price}`}</i></p>
         }
           {!Loaded?
          <Skeleton
          animation="wave"
          height={50}
          width="300px"
          style={{ marginBottom: 6 }}
        />
        :   
         <span className='DESCRIPTION-SIMILARPRODUCTS-PAGE'>{description}</span>
           }
         </div>
         
       </div>

     </div>

    </div>
    </>
  )
}

export default SimilarProductsContent