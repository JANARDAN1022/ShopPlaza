import React,{useEffect}  from 'react';
//import Navbar from './components/layout/Header/Navbar';
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
import store from './store';
import { LoaodUser } from './Actions/UserAction';
import Payment from './components/Pages/Payment/Payment';
import ShowNav from './components/ShowNav';

const App = () => {


  
 useEffect(()=>{
 store.dispatch(LoaodUser());
 },[])


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
      </Routes>
      <Footer />
    </Router>

   

      
    
  )
}

export default App;