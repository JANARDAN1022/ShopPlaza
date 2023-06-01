import React from 'react';
import './CategoryHeads.css';
import CategoryHeadContent from './CategoryHeadContent';


const CategoryHeads = () => {

    const Categoryimages =[
    {
        url:"https://rukminim1.flixcart.com/fk-p-flap/128/128/image/46376ceed3448aff.png?q=100"
    },
    {
        url:"https://rukminim1.flixcart.com/fk-p-flap/128/128/image/d64cae0f8081256a.png?q=100"
    },
    {
        url:"https://rukminim1.flixcart.com/fk-p-flap/128/128/image/d44ffc537ed6e241.png?q=100"
    },
    {
        url:"https://rukminim1.flixcart.com/fk-p-flap/128/128/image/7dbcda527b648814.png?q=100"
    },
    {
        url:"https://rukminim1.flixcart.com/fk-p-flap/128/128/image/d300931a0fd1c17e.png?q=100"
    },
    {
        url:"https://rukminim1.flixcart.com/fk-p-flap/128/128/image/e29a070388d534a5.png?q=100"
    },
    {
        url:"https://rukminim1.flixcart.com/fk-p-flap/128/128/image/2dac2decff60c650.png?q=100"
    },
    {
        url:"https://rukminim1.flixcart.com/fk-p-flap/128/128/image/1350e22cff9663e7.png?q=100"
    },
    {
        url:"https://rukminim1.flixcart.com/fk-p-flap/128/128/image/994a83c90019fb5f.png?q=100"
    },
]


  return (
    <div className='CategoryHeadMainDiv'>
        <div className="CategoryHeadWrapper">
    <CategoryHeadContent url={Categoryimages[0].url } CategoryHead='Grocery' icondisplay='none' />
    <CategoryHeadContent url={Categoryimages[1].url } CategoryHead='Mobiles' icondisplay='none' />
    <CategoryHeadContent url={Categoryimages[2].url } CategoryHead='Fashion' icondisplay='none'/>
    <CategoryHeadContent url={Categoryimages[3].url } CategoryHead='Electronics' icondisplay='none'/>
    <CategoryHeadContent url={Categoryimages[4].url } CategoryHead='Home' icondisplay='none'/>
    <CategoryHeadContent url={Categoryimages[5].url } CategoryHead='Appliances'  icondisplay='none'/>
    <CategoryHeadContent url={Categoryimages[6].url } CategoryHead='Travel' icondisplay='none'/>
    <CategoryHeadContent url={Categoryimages[7].url } CategoryHead='Top Offers' icondisplay='none'/>
    <CategoryHeadContent url={Categoryimages[8].url } CategoryHead='Beauty, Toys & More' icondisplay='none' />
    </div>
    </div>
  )
}

export default CategoryHeads;