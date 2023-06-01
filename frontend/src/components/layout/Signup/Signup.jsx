import React,{useState,useRef} from 'react';
import './Signup.css';
import {Link, useNavigate} from 'react-router-dom';
import CategoryCommon from '../../Categories/CommonCategory/CategoryCommon';
import { useDispatch,useSelector } from 'react-redux';
import { RegisterUser } from '../../../Actions/UserAction';

const Signup = () => {


   
    const [FirstName,setFirstName]=useState('');
    const [SecondName,setSecondName]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [errorMessage,seterrorMessage]=useState('');
    const [Gender,setGender]=useState('');
    const Maleref = useRef();
    const Femaleref = useRef();

    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const {error,loading}=useSelector(state=>state.user);
   


    const HandleRegister = (e)=>{
      e.preventDefault();
      if(email!=="" && password!=="" && FirstName!=="" && SecondName!=="" && Gender==='' ){
        seterrorMessage('Please select gender');
        setTimeout(()=>{
         seterrorMessage('');
        },3000);
      }
      if(email==="" || password==="" || FirstName==="" || SecondName==="" ){
        seterrorMessage('Please Enter All Fields')
        setTimeout(() => {
          seterrorMessage('');
          }, 3000); // set timeout to 3 seconds
      }

      if(email!=="" && password!=="" && FirstName!=="" && SecondName!=="" && Gender!==''){
        dispatch(RegisterUser(FirstName,SecondName,email,password,Gender));
        setFirstName('');
        setSecondName('');
        setemail('');
        setpassword('');
        Navigate('/');
      }else{
        if(error && email!=="" && password!=="" && FirstName!=="" && SecondName!=="" && Gender!==''){
          seterrorMessage('User Already Exists')
          setTimeout(() => {
          seterrorMessage('')
          }, 3000); // set timeout to 3 seconds
        }
           }

    }


  return (
    loading?'loading':
    <div className='SignupMainDiv'>
     <div className="SignupCategoryHead">
        <CategoryCommon />
     </div>

    <div className="SignupCard">
      
    <div className="SignupContainer"> 

<div className="SignupLeftDiv">
  <div className="signupLeftDivContainer">
 <h2>Looks like you're new here!</h2>
 <span className='SignupLEftDivTEXT'>Sign up with your email to get started</span>
</div>
</div>

<div className="signupRightDiv">
  <div className="signupRightDivcontainer">
<form className='SignupForm' >
   
   <div className='FirstNameInput'>
   <input autoComplete='off' value={FirstName} name='FirstName' placeholder=' FirstName' type='text' onChange={(e)=>setFirstName(e.target.value)}/>
   </div>

   <div className='SecondNameInput'>
   <input autoComplete='off' value={SecondName} name='SecondName' placeholder=' LastName' type='text' onChange={(e)=>setSecondName(e.target.value)}/>
   </div>

  <div className="emailInput">
   <input autoComplete='off' value={email} name='email' placeholder=' Your email' type='email' onChange={(e)=>setemail(e.target.value)}/>
   </div>

   <div className="passwordInput"> 
   <input autoComplete='off' value={password}  placeholder='password' name='password' type='password' onChange={(e)=>setpassword(e.target.value)}/>
   </div>
<span>{errorMessage}</span>
  <div className='GenderInput'>
  <span className='SelectGender'>Select Your Gender :</span>
  <div className='MaleGenderDiv' >
 <span>Male</span>
  <input type='checkbox' name='MaleGender'  ref={Maleref} onClick={()=>{
    Femaleref.current.checked=false;
    if(Maleref.current.checked===true){
    setGender('Male');
    }else{
      setGender('');
    }
  }
  }/>
 </div>
 
 <div className='FemaleGenderDiv'>
 <span>Female</span>
  <input type='checkbox' name='FemaleGender' ref={Femaleref} onClick={()=>{
    Maleref.current.checked=false;
    if(Femaleref.current.checked===true){
    setGender('Female');
    }else{
      setGender('');
    }
    }}/>
 </div>
 
 </div>

<button className='SignupButton' onClick={HandleRegister}>Signup</button>
</form>

<div className="LoginLink">
<Link to='/Login'>Already a User ? Login to Your Account</Link>
</div>

</div>
</div>


</div>


    </div>
    
    </div>
  )
}

export default Signup