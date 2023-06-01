import React from "react";
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import './ImgSlider.css';





export default function ImgSlider({Product}) {



 
    const PrevArrow = (props) => (
        <button {...props} className="slick-arrow slick-prev ArwBtn"
        aria-label="Previous">
          <AiOutlineArrowLeft size={40} className="LeftArrowImg"/>
        </button>
      );
      
      const NextArrow = (props) => (
        <button {...props} className="slick-arrow slick-next ArwBtn"
        aria-label="Next">
          <AiOutlineArrowRight size={40} className="RightArrowImg"/>
        </button>
      );


    var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };



  return (
    <div className='ProductDetailImage'>
  <Slider {...settings}
  prevArrow={<PrevArrow />}
  nextArrow={<NextArrow />}
  className="ImgSlider">
    {Product && Product?.images?.map((img)=>(
  <img src={img?.url} alt='img' className="SliderImgPD" key={Product?._id}/>
    ))}
  </Slider>
  </div>
      );
}