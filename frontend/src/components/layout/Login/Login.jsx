import React, { useEffect,useRef,useState } from 'react';
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
  const [Loading,setLoading]=useState(false);
  const EmailRef = useRef();
  const PassRef = useRef();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const {error,loading,isAuthenticated,user}=useSelector(state=>state.user);
const Role =  user?.role;
  

  const redirect =window.location.search.split("=")[1];
useEffect(()=>{  
   if(isAuthenticated && redirect){
      if(redirect==='/DashBoard' && Role==='user'){
    Navigate(`/RegisterAsSeller`);
      }else{
        Navigate(`/${redirect}`);
      }
  }else if(isAuthenticated && !redirect){
    Navigate('/');
  }
  },[dispatch,isAuthenticated,Navigate,redirect,Role])


  const HandleLogin = async(e)=>{
    e.preventDefault();

    if(Email!== "" && Password!==""){
     setLoading(true);
     const Response = await dispatch(LoginUser(Email,Password));
     if(Response.success){
      setEmail("");
      setPassword("");
      setEmailMessage('Your Email');
      setPasswordMessage('Password');
      setLoading(false);
     }else{
      setLoading(false);
      setEmail("");
      setPassword("");
      seterrorMessage('Inavlid Email or Password');
      setTimeout(() => {
        seterrorMessage('');
      }, 3000);
     }
      }
    
    if(Email!=="" && Password!==""&&error){


      seterrorMessage('Invalid Email or Password');
      setTimeout(() => {
       seterrorMessage('');
       }, 3000); // set timeout to 5 seconds
        }

    if(Email==="" && Password===""){
      EmailRef.current.focus();
      setEmailMessage('Email  Cannot Be Empty*');
      setPasswordMessage('Password Cannot Be Empty*');
    }else if(Email===""){
      EmailRef.current.focus();
    setEmailMessage('This Field Cannot Be Empty*')
    }else if(Password===""){
      PassRef.current.focus();
      PassRef.current.style.outlineColor="red";
      setPasswordMessage('This Field Cannot Be Empty*')
    } 
  }
  
  

  return (
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
          <input  ref={EmailRef} autoComplete='off'  value={Email} name='Email' placeholder={EmailMessage} type='email' onChange={(e)=>setEmail(e.target.value)}/>
          </div>

         <div className="PasswordInput"> 
          <input ref={PassRef} autoComplete='off' value={Password}  placeholder={PasswordMessage} name='Password' type='password' onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <span>{errorMessage}</span>
          <div className='LoginButtonDiv'>
          <button className='LoginButton' onClick={HandleLogin}>Login</button>
          <span style={{display:Loading || loading?'':'none'}} className="loader"></span>
          </div>
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