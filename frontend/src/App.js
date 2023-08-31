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
import ShowFooter from './components/ShowFooter';
import Cart from './components/Pages/Cart/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Pages/Profile/Profile';
import Confirmation from './components/Pages/Confirmation/Confirmation';
import  OrderPlaced  from './components/Pages/OrderPlaced/OrderPlaced';
import store from './store';
import { LoadUser } from './Actions/UserAction';
import Payment from './components/Pages/Payment/Payment';
import ShowNav from './components/ShowNav';
import BuyNow from './components/Pages/Payment/BuyNow';
import SellerRegister from './components/Pages/SellerRegister/Email-Categories/SellerRegister';
import SellerPassword from './components/Pages/SellerRegister/Password/SellerPassword';
import SellerInfo from './components/Pages/SellerRegister/SellerInfo/SellerInfo';
import DashBoard from './components/layout/DashBoard/DashBoard';




const App = () => {
 
 
  useEffect(()=>{
    store.dispatch(LoadUser());
  },[]);  


  return (
     <Router basename='/'>
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
        <Route path='/RegisterAsSeller' element={<SellerRegister />} />
        <Route path='/PasswordCreation' element={<SellerPassword />} />
        <Route path='/OnBoarding-Dashboard' element={<SellerInfo />} />
        <Route path='/DashBoard' element={<DashBoard />} />
      </Routes>
      <ShowFooter />
    </Router>


   

      
    
  )
}

export default App;