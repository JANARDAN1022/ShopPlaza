import React from 'react';
import './CategoryCommon.css'
import CategoryCommonContent from './CategoryCommonContent';

const CategoryCommon = () => {
  return (
    <div>
        <div className="CommonCategoryMainDiv">
          <div className="CommonCategoryWrapper">
        <CategoryCommonContent  imgdisplay='none' CategoryHead='Electronics'/>
        <CategoryCommonContent imgdisplay='none' CategoryHead='TVs & Appliances'/>
        <CategoryCommonContent imgdisplay='none' CategoryHead='Men'/>
        <CategoryCommonContent imgdisplay='none' CategoryHead='Women'/>
        <CategoryCommonContent imgdisplay='none' CategoryHead='Baby & Kids'/>
        <CategoryCommonContent imgdisplay='none' CategoryHead='Home & Furntiure'/>
        <CategoryCommonContent imgdisplay='none' CategoryHead='Sports,Books & More'/>
        <CategoryCommonContent imgdisplay='none' CategoryHead='Flights' icondisplay='none'/>
        <CategoryCommonContent imgdisplay='none' CategoryHead='Offer Zone' icondisplay='none'/>
       </div>
        </div>
    </div>
  )
}

export default CategoryCommon