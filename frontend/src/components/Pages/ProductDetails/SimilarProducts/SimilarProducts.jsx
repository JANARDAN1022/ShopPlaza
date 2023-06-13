import React, { useEffect, useRef, useState } from 'react';
import './SimilarProducts.css';
import CategoryCommon from '../../../Categories/CommonCategory/CategoryCommon';
import SimilarProductsContent from './SimilarProductsContent';
import {RxCross2} from 'react-icons/rx';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import {BsCheck2All} from 'react-icons/bs';
import {AiFillStar} from 'react-icons/ai';
import {getSimilarProducts} from '../../../../Actions/ProductAction';
import {useDispatch,useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';




const SimilarProducts = () => {
const {productId} = useParams();
const check3ref = useRef();
const check4ref =useRef();

 
 const [minRating,setminRating]=useState(0);
 const [price,setprice]=useState([0,100000]); 


const dispatch = useDispatch();

 const HandlepriceChange=(event,newprice)=>{
  setprice(newprice);
 }

 const handleRatingChange = (event) => {
  const rating = parseInt(event.target.value);
  if(event.target.checked){
  setminRating(rating);
  }else{
    setminRating(0);
  }
};

 useEffect(()=>{
  dispatch(getSimilarProducts(productId,price,minRating));
  window.scrollTo(0,0);
 },[dispatch,productId,price,minRating]);

 const {similarProducts} = useSelector(state => state.products);
 const products = similarProducts && similarProducts.relatedProducts;

  return (
    <>
    <CategoryCommon />
    <div className='SimilarProductsMainDiv' >
   <div className='SimilarProductsContainer' style={{height:products?.length>3?'max-content':'628px'}}>

     <div className='SimilarProductsFilter'>
     <div className='SimilarProductsFilterContainer'>
       
       <div className='FilterHead'>
         
         <div className='FILTERHEADS'>
         <h3>Filters</h3>
         <span onClick={()=>{
          setprice([0,100000]);
          setminRating(0);
          check3ref.current.checked=false;
          check4ref.current.checked=false;
         }}>CLEAR ALL</span>
         </div>
       
       <div className='SelectedFilters'>
        <div className='SelectedFiltersContent' style={{display:minRating!==0?'flex ':'none'}} onClick={()=>{
          setminRating(0);
          if(minRating===3){
          check3ref.current.checked = false;
          }else{
            check4ref.current.checked =false;
          }
        }}>
         <RxCross2 />
         <span>{minRating} & above</span>
         </div>
         <div className='SelectedFiltersContent' style={{display: price[0]!==0 || price[1]!==100000?'flex':'none'}} onClick={()=>setprice([0,100000])}>
         <RxCross2 />
         <span>{`${price[0]}-${price[1]}`}</span>
         </div>
         <div className='SelectedFiltersContent' style={{display:'none'}}>
         <RxCross2 />
         <span>Special Price</span>
         </div>
       
         
         
       </div>
       
       </div>
      
      <div className='FILTERS'>
        <div className='FILTERSCONTAINER'>
         <div className='COMMONFILTERS'>
            <div className='PRICEFILTER'>
            <h4>PRICE</h4>
            <span onClick={()=>{
             setprice([0,100000]);

            }} 
            >CLEAR</span>
         </div>

         <div className='PRICESLIDER'>
          <Box width={200} marginLeft={2}>
         <Slider
         value={price}
         onChange={HandlepriceChange}
          valueLabelDisplay="auto"
           aria-labelledby='rang-slider'

           min={0}
           max={100000}
                     />
             </Box>

         </div>

        
         </div>
        
        
        
        
        </div>
      </div>
      <div className='ShopPlazaAssured'>
      <input type='checkbox' name='assuredcheckbox'/>
      <span>ShopPlaza-Assured<BsCheck2All size={18} className='AssuredIcon'/></span>

      </div>

      <div className='RATINGFILTER'>
         <span>Filter BY Ratings</span>
         <div className='Ratings' >
          <div className='Ratings3' >
          <input  type='checkbox' name='3ratings' value={3} onChange={handleRatingChange} ref={check3ref} onClick={()=>{
            check4ref.current.checked =false;
          }}/>
         <span>3<AiFillStar className='RATINGICON' size={15}/> & above</span>
         </div>
         <div className='Ratings4' >
         <input  type='checkbox' name='4ratings' value={4} onChange={handleRatingChange} ref={check4ref}  onClick={()=>{
            check3ref.current.checked =false;
          }}/>
         <span>4<AiFillStar size={15} className='RATINGICON'/> & above</span>
         </div>
          </div>
      </div>

     </div>
     </div>
     
     <div className='SimilarProducts'>
     {products && products.map((products)=>(
          <SimilarProductsContent products={products} key={products._id} />
        ))
        }
     </div>

   </div>

    </div>
    </>
  )
}

export default SimilarProducts