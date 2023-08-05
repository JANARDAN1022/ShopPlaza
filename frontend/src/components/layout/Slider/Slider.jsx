import React from 'react';
import { Slide } from 'react-slideshow-image';
import './Slider.css';
import 'react-slideshow-image/dist/styles.css';
import { Icon } from 'react-icons-kit';
import {arrow_left} from 'react-icons-kit/ikons/arrow_left'
import {arrow_right} from 'react-icons-kit/ikons/arrow_right'






const slideImages = [
  {
      url:'https://rukminim1.flixcart.com/fk-p-flap/844/140/image/22fbb4657fa662f9.jpg?q=50'
  }, 
{
    url: 'https://rukminim1.flixcart.com/fk-p-flap/844/140/image/a473e0c2ff5779e1.jpg?q=50'
 },
  {
     url:"https://rukminim1.flixcart.com/fk-p-flap/844/140/image/a2d9e39f397fe24d.jpeg?q=50"
   // url: 'https://rukminim1.flixcart.com/fk-p-flap/844/140/image/a473e0c2ff5779e1.jpg?q=50'  
  }
]
const Slider = () => {
  const buttonStyle = {
    width: "50px",
    height:'100px',
    backgroundcolor:'hsla(0,0%,100%,.99)',
    border: '0px'
};

const properties = {
    prevArrow: <button style={{ ...buttonStyle }}><Icon icon={arrow_left} size={40} /></button>,
    nextArrow: <button style={{ ...buttonStyle }}><Icon icon={arrow_right} size={40} /></button>
}

    return (
      <div className="slide-container">
        <Slide duration={2000}  {...properties}>
         {slideImages.map((slideImage, index)=> (
            <div key={index} className='slideshowdiv'>
              <div className='slideshowdiv'  style={{ 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}


export default Slider;