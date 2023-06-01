import React from "react";
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import './ReviewSlider.css';
import {AiTwotoneStar} from 'react-icons/ai';



export default function SimpleSlider({data}) {
 
    const PrevArrow = (props) => (
        <button {...props} className="slick-arrow slick-prev ArwBtn">
          <AiOutlineArrowLeft size={40} className="LeftArrowReview"/>
        </button>
      );
      
      const NextArrow = (props) => (
        <button {...props} className="slick-arrow slick-next ArwBtn">
          <AiOutlineArrowRight size={40} className="RightArrowReview"/>
        </button>
      );


    var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };




  return (
    <div className="ReviewSliderMain" style={{
      height:data?.reviews?.length >0?'400px':'250px'
      }}>
        <h3>Reviews :</h3>
        {data?.reviews?.length >0?
    <Slider {...settings}
    prevArrow={<PrevArrow />}
    nextArrow={<NextArrow />}>
      {data?.reviews?.map((review)=>(
       <div className="ReviewSliderContent" key={review?._id}>

         <div className="RevieUserInfo">
            <div className="RevieUserInfoHead">
            <img src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="ProfileImg" className="ReviewUserProfile"/>
         <span>{review?.name}</span>
         </div>
         <div className="ReviewUserrating">
         <span>{review?.rating}</span>
         <AiTwotoneStar size={15} className="userreviewratingstar"/>
         </div>
         </div>

         <div className="ReviewComment">
           <div className="Review">
            <p>{review?.comment}</p>
           </div>
         </div>

       </div>
           )) }
           </Slider>
           :
         <div className="NoReviews">
          <h1>No Reviews Yet!!</h1>
         </div>
        } 
   
    </div>
   
  );
}