import React, { useState } from 'react';
import './CategoryCommonContent.css';
import { Icon } from 'react-icons-kit';
import {ic_keyboard_arrow_up} from 'react-icons-kit/md/ic_keyboard_arrow_up';
import {ic_keyboard_arrow_down_twotone} from 'react-icons-kit/md/ic_keyboard_arrow_down_twotone';


const CategoryCommonContent = (props) => {

  const [isCommonHoverd,setisCommonHoverd]=useState(false);
 

  return (
    <div className='CCHMAINDIV'>
        <div className="CommonCategorycontainer" >
            <div className="CommonCategoryHeadContentwrapper">
            <img src={props.url} alt='img' style={{display:props.imgdisplay}}/>
            <div className="CommonCategoryHeadTitle" onMouseEnter={()=>setisCommonHoverd(true)} onMouseLeave={()=>setisCommonHoverd(false)} >
            <span>{props.CategoryHead}</span>
            <Icon style={{display:props.icondisplay}} icon={isCommonHoverd?ic_keyboard_arrow_up:ic_keyboard_arrow_down_twotone} size={15} />
            </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryCommonContent;