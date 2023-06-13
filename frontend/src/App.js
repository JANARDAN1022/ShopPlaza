import React,{useEffect}  from 'react';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import './App.css'
import Home from './components/Pages/Home/Home';
import Login from './components/layout/Login/Login';
import Signup from './components/layout/Signup/Signup';
import CategoryPage from './components/Pages/CategoryPage/CategoryPage';
import SimilarProducts from './components/Pages/ProductDetails/SimilarProducts/SimilarProducts';
import Products from './components/Pages/Products/Products';
import ProductDetail from './components/Pages/ProductDetails/SpecificProductDetail/ProductDetail';
import Footer from './components/layout/Footer/Footer';
import Cart from './components/Pages/Cart/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Pages/Profile/Profile';
import Confirmation from './components/Pages/Confirmation/Confirmation';
//import PayStripe from './components/Pages/Stripe/PayStripe';
import  OrderPlaced  from './components/Pages/OrderPlaced/OrderPlaced';
import store from './store';
import { LoadUser } from './Actions/UserAction';
import Payment from './components/Pages/Payment/Payment';
import ShowNav from './components/ShowNav';
import BuyNow from './components/Pages/Payment/BuyNow';



const App = () => {
  
  useEffect(()=>{
    store.dispatch(LoadUser());
    },[]);   

  return (
     <Router>
     <ShowNav />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/category/:category' element={<CategoryPage />} />
        <Route path='/similar/:productId' element={<SimilarProducts />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/ProductDetail/:productid' element={<ProductDetail />} />       
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup /> }/>
        <Route path='/Cart' element={< Cart />} />  
        <Route path='/MyAccount' element={<ProtectedRoute Component={Profile}  />} />  
        <Route path='/Checkout' element={<ProtectedRoute Component={Payment} />} />
        <Route path='/Confirmation' element={<ProtectedRoute Component={Confirmation} />} />
       {/* <Route path="/process/payment" element={<ProtectedRoute Component={PayStripe} />} />*/}
        <Route path='/orderPlaced' element={<ProtectedRoute Component={OrderPlaced} />} /> 
        <Route path='/BuyNow/:productId' element={<ProtectedRoute Component={BuyNow} />} /> 
      </Routes>
      <Footer />
    </Router>


   

      
    
  )
}

export default App;