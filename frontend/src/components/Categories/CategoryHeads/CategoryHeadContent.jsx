import React, { useState } from 'react';
import './CategoryHeadContent.css';
import { Icon } from 'react-icons-kit';
import {ic_keyboard_arrow_up} from 'react-icons-kit/md/ic_keyboard_arrow_up';
import {ic_keyboard_arrow_down_twotone} from 'react-icons-kit/md/ic_keyboard_arrow_down_twotone';
import {useNavigate} from 'react-router-dom';

const CategoryHeadContent = (props) => {

  const [isHoverd,setisHoverd]=useState(false);
  const Navigate = useNavigate();
 

  return (
    <div className='CHMainDiv'>
        <div className="Categorycontainer" >
            <div className="CategoryHeadContentwrapper" onClick={()=>Navigate(`/category/${props.category}`)}>
            <img src={props.url} alt='img' style={{display:props.imgdisplay}}/>
            <div className="CategoryHeadTitle" onMouseEnter={()=>setisHoverd(true)} onMouseLeave={()=>setisHoverd(false)} >
            <span>{props.CategoryHead}</span>
            <Icon style={{display:props.icondisplay}} icon={isHoverd?ic_keyboard_arrow_up:ic_keyboard_arrow_down_twotone} size={15} />
            </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryHeadContent;