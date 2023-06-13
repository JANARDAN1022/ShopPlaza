import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { GetProductsDetails } from '../../../../Actions/ProductAction';
import { useDispatch,useSelector} from 'react-redux';
import  CategoryCommon from '../../../Categories/CommonCategory/CategoryCommon'
import {FaShoppingCart,FaBolt} from 'react-icons/fa';
import {AiTwotoneStar} from 'react-icons/ai';
import SimpleSlider from './ReviewSlider';
import "slick-carousel/slick/slick.css";
import ImgSlider from './imgSlider';
import {addToCart} from '../../../../Actions/CartAction';

const ProductDetail = () => {
  const Navigate=useNavigate();
  const dispatch = useDispatch();
  const {productid} = useParams();
  const [quantity,setquantity]=useState(1);
  useEffect(()=>{
   dispatch(GetProductsDetails(productid))
  },[dispatch,productid]);

  const {loading,error,product} =useSelector(state=>state.productDetails);
  const {user} = useSelector(state=>state.user);
  const userId = user?._id;
  const ProductName = `${product?.name}`;
  const ProductImg = `${product?.images?.[0].url}`;
  const productPrice = product?.price;
  const stock = product?.stock;
  const ItemId = product?._id;
 
  

  const AddToCartHandler =()=>{
    setquantity(1);
    if(ProductName!=='' && ProductImg!=='' && productPrice && quantity>0 && stock>0){
    dispatch(addToCart(userId,ItemId,ProductName,ProductImg,productPrice,quantity,stock));
    setTimeout(() => {
      Navigate('/Cart');
    }, 1000);
  }
  }

  const HandleBuyNow = ()=>{
    setquantity(1);
    if(ProductName!=='' && ProductImg!=='' && productPrice && quantity>0 && stock>0){
    dispatch(addToCart(userId,ItemId,ProductName,ProductImg,productPrice,quantity,stock));
    setTimeout(() => {
      Navigate(`/BuyNow/${productid}`);
    }, 1000);
  }
  }

  return (
      <>
<CategoryCommon />
    <div className='ProductDetailMain'>
   
     <div className='ProductDetailContainer'>
      
      <div className='ProductDetailLeft'>
        {loading?'Loading'
        :error?"error"
        :
        <ImgSlider Product={product} />
        }
        <div className='ProductCartbuyButtons'>
          {
            product?.stock<=1?  
        <div className='ProductCartButtonDisabled'>
          <button disabled > Add To Cart</button>
         <div className='ProductDetailIconCart'>
         <FaShoppingCart size={20} className='Carticon'/>
         </div>
        </div>
        :
        <div className='ProductCartButton'>
        <button onClick={AddToCartHandler}> Add To Cart</button>
       <div className='ProductDetailIconCart'>
       <FaShoppingCart size={20} className='Carticon'/>
       </div>
      </div>
          }
        
        {product?.stock<1?
        <div className='ProductBuyButtonDisabled'>
        <button>Buy Now</button>
        <div className='ProductDetailIconBolt'>
        <FaBolt size={21} className='BoltIcon'/>
        </div>
        </div>
                :
       <div className='ProductBuyButton'>
        <button onClick={HandleBuyNow}>Buy Now</button>
     <div className='ProductDetailIconBolt'>
     <FaBolt size={21} className='BoltIcon'/>
      </div>
      </div>
                }
        </div>

      </div>

      <div className='ProductDetailRight'>
      
        <div className='ProductDetailRightContainer'>

        <div className='ProductDetailInfoHead'>
        
        <div className='ProductDetailsName'>
        <h1>{product?.name}</h1>
        <span>#{product?._id}</span>
        </div>

        <div className='ProductRating'>
        <span>{product?.rating}</span>
        <AiTwotoneStar size={20} className='StarIcon'/>
        </div>
        
        </div>
      
      <div className='ProductDetailsContent'>
      
         <div className='ProductDetailPrice'>
          <p>Price :</p>
          <span>Rs{product?.price}</span>
         </div>

         <div className='StockInfo'>
         <span style={{color:product?.stock>=1?'green':'red'}}>{`${product?.stock >= 1?'In Stock':'Out Of Stock'}`}</span>
         </div>

          
      </div>

      <div className='ProductInfoContent'>
      
      <div className='ProductDetailsInfo'>
          <h1>Product Info:</h1>
          <p>{product?.description}</p>
      </div>
      
      </div>

      <div className='ProductReviews' style={{borderColor:'red',border:'2px'}}>
      <SimpleSlider data={product}/>
      </div>

      </div>
      
      </div>

     </div>

    </div>
    </>
  )
}

export default ProductDetail;