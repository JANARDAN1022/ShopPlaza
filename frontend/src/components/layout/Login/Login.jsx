import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCommon from '../../Categories/CommonCategory/CategoryCommon';
import {Link} from 'react-router-dom';
import {LoginUser} from '../../../Actions/UserAction';
import {useDispatch,useSelector} from 'react-redux';
import './Login.css';



const Login = () => {

  const [Email,setEmail]=useState('');
  const [Password,setPassword]=useState('');
  const [EmailMessage,setEmailMessage]=useState('Your Email');
  const [PasswordMessage,setPasswordMessage]=useState('Password');
  const [errorMessage,seterrorMessage]=useState('');
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const {error,loading,isAuthenticated}=useSelector(state=>state.user);

  

  const redirect = window.location.search?window.location.search.split("=")[1]:'';
useEffect(()=>{
 
  
    if(isAuthenticated){
    Navigate(`/${redirect}`);
  }
  },[dispatch,isAuthenticated,Navigate,redirect])


  const HandleLogin = (e)=>{
    e.preventDefault();

    if(Email!== "" && Password!==""){

      dispatch(LoginUser(Email,Password));
      setEmail("");
      setPassword("");
      setEmailMessage('Your Email');
      setPasswordMessage('Password')
      }
    
    if(Email!=="" && Password!==""&&error){


      seterrorMessage('Invalid Email or Password');
      setTimeout(() => {
       seterrorMessage('');
       }, 3000); // set timeout to 5 seconds
        }

    if(Email==="" && Password===""){
      setEmailMessage('Email  Cannot Be Empty*');
      setPasswordMessage('Password Cannot Be Empty*');
    }else if(Email===""){
    setEmailMessage('This Field Cannot Be Empty*')
    }else if(Password===""){
      setPasswordMessage('This Field Cannot Be Empty*')
    } 
  }
  
  

  return (
     loading?'Loading':
    <div className='LoginMainDiv'>

      <div className="LoginCategoryhead">
        <CategoryCommon />
        </div>

        <div className="LoginCard">
        <div className="LoginContainer">

          <div className="LoginLeftDiv">
            <div className="LoginLeftDivContainer">
           <h2>Login</h2>
           <span className='LoginTextFirstPart'>Get access to your Orders,</span>
           <span className='LoginLEftDivTEXT'>Wishlist and Recommendations</span>
          </div>
          </div>

          <div className="LoginRightDiv">
            <div className="LoginRightDivcontainer">
          <form className='LoginForm' >
            <div className="EmailInput">
          <input autoComplete='off'  value={Email} name='Email' placeholder={EmailMessage} type='email' onChange={(e)=>setEmail(e.target.value)}/>
          </div>

         <div className="PasswordInput"> 
          <input autoComplete='off' value={Password}  placeholder={PasswordMessage} name='Password' type='password' onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <span>{errorMessage}</span>
          <button className='LoginButton' onClick={HandleLogin}>Login</button>
          </form>
          
          <div className="SignupLink">
          <Link to='/Signup'>New To ShopPlaza ? Create an account</Link>
          </div>
          
          </div>
          </div>
          

          </div>
        </div>
      
    </div>
  
    
  )
}

export default Login;