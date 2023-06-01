import React from 'react';
import Slider from '../../layout/Slider/Slider';
import ProductSlider from '../../layout/Slider/ProductSlider';
import CategoryHeads from '../../Categories/CategoryHeads/CategoryHeads';
import Sponsor from '../../layout/SponsorDeal/Sponsor';
import {GetProducts} from '../../../Actions/ProductAction';
import {useDispatch} from 'react-redux';
import { useEffect } from 'react';

const CategoryImages = [
  {
    url:'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    url:'https://img.freepik.com/premium-photo/shopping-cart-trolley-with-children-s-toys-pink-background-copy-space-multicolored-toys-toddler-baby-sale-toys-good-offer-discount-empty-space-your-text-3d-rendering_429124-3144.jpg?size=626&ext=jpg&ga=GA1.2.1433330591.1680957180&semt=robertav1_2_sidr'
  },
  {
    url:'https://img.freepik.com/free-vector/summer-sale-background-with-woman-shopping_23-2147805381.jpg?size=626&ext=jpg&ga=GA1.1.1433330591.1680957180&semt=robertav1_2_sidr'
  },
  {
    url:'https://img.freepik.com/free-photo/fruits-sports-equipment-near-tablet_23-2147750733.jpg?size=626&ext=jpg&ga=GA1.1.1433330591.1680957180&semt=robertav1_2_sidr'
  },
  {
    url:'https://img.freepik.com/free-photo/suitcase-with-traveler-accessories_1150-17819.jpg?size=626&ext=jpg&ga=GA1.1.1433330591.1680957180&semt=robertav1_2_sidr'
  },
  {
    url:'https://img.freepik.com/premium-photo/thai-kitchen-background_38810-1442.jpg?size=626&ext=jpg&ga=GA1.1.1433330591.1680957180&semt=robertav1_2_sidr'
  }
]






const Home = () => {
  const dispatch = useDispatch();
  

  useEffect(()=>{
  dispatch(GetProducts());
  },[dispatch]);

  return (
    <div >
      <CategoryHeads />
        <Slider />
            
        <ProductSlider category={'Best of Electronics'}        categoryImg={CategoryImages[0].url}/>
        <ProductSlider category={'Beauty, Food, Toys & more'}  categoryImg={CategoryImages[1].url}/>
        <Sponsor />
        <ProductSlider category={'Shop for a Cool Summer'}     categoryImg={CategoryImages[2].url}/>
        <ProductSlider category={'Sports, Healthcare & more'}  categoryImg={CategoryImages[3].url}/>
        <Sponsor />
        <ProductSlider category={'Vacay Travel Essentials'}    categoryImg={CategoryImages[4].url}/>
        <ProductSlider category={'Home & Kitchen Essentials'}  categoryImg={CategoryImages[5].url}/>
    </div>
  )
}

export default Home;