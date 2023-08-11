import React, { useRef, useState,useEffect } from 'react';
import './ProductSlider.css';
import {useNavigate} from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import ProductSliderContent from './ProductSliderContent';
import {arrow_left} from 'react-icons-kit/ikons/arrow_left'
import {arrow_right} from 'react-icons-kit/ikons/arrow_right'
import {GetProducts} from '../../../Actions/ProductAction';
import {useDispatch,useSelector} from 'react-redux';
import { Skeleton } from '@mui/material';




const ProductSlider = ({category,categoryImg}) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const{products,loading,error}=useSelector(state=>state.products);
  
 useEffect(()=>{
    dispatch(GetProducts());
  
 },[dispatch]);



 

  const [showArrow,setshowArrow]=useState(false);

  const ProductSliderRef = useRef();
 
const HandleArrowClick=(direction)=>{
  let distance = ProductSliderRef.current.getBoundingClientRect().x;
  if(direction==='Left'){
    setshowArrow(!showArrow);
    ProductSliderRef.current.style.transform= `translate(${360 + (distance)}px)`
  }
  if(direction==='Right'){
   setshowArrow(!showArrow);
   ProductSliderRef.current.style.transform= `translate(${-269*3 + distance}px)` 
  }

}

const filteredProducts = products.filter((product) =>
product.category === category ? true : false
);

  



  return (
    <div className='ProductSliderMain'>
      {loading?
      <Skeleton height='500px' width='1840px' animation='wave' style={{zIndex:1000}}/>
      :
       <>
       <div className="ProductsCategory">

        <div className="categoryHead">

          <div className="CategoryWrapper">
           <h2 className='CategoryTitle'> {category}</h2>
        <button className='VIEWALL' onClick={()=>Navigate(`/category/${category}`)}>VIEW ALL</button>
        </div>
       </div>
        
       <div className="categoryimage">
        <div className="imageContainer">
        <img className='Imageforcategory' src={categoryImg} alt='img' />
       </div>
       </div>

       </div>


       
     <div className="ProductsSlide" >
      <Icon onClick={()=>HandleArrowClick('Left')} className={`ShowARROWS ${showArrow?'ShowLeftArrow':'LeftArrow'}`} icon={arrow_left} size={45} />
      <div className="ProductSlidercontainer" ref={ProductSliderRef} >
       
      {error?'error':  filteredProducts.slice(0,8).map((product) => (
      <ProductSliderContent  key={product._id} product={product}  />
    ))}
      </div>
      <Icon onClick={()=>HandleArrowClick('Right')} className={`ShowARROWS ${!showArrow?'ShowRightArrow':'RightArrow'}`} icon={arrow_right}  size={45} />
      </div>

      </>
}
      </div>
  )
}


export default ProductSlider;