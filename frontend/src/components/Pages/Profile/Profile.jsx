import React, { useEffect, useRef, useState } from 'react';
import './Profile.css';
import {useSelector,useDispatch} from 'react-redux';
import FemaleProfile from '../../../Assets/FemaleProfile.png';
import MaleProfile from '../../../Assets/MaleProfile.png';
import {GrFormNext} from 'react-icons/gr';
import { PersonalInfoUpdate,EmailInfoUpdate,PasswordInfoUpdate } from '../../../Actions/UserAction';
import {AiOutlineClose} from 'react-icons/ai';

const Profile = () => {
  const [ShowPersonalEdit,setShowPersonalEdit]=useState(false);
  const [ShowAccountEdit,setShowAccountedit]=useState(false);
  const [ShowPasswordedit,setShowPasswordedit]=useState(false);
  const [ShowPassword,setShowPassword]=useState(false);
  const [error,seterror]=useState('');
  const [Success,setSuccess]=useState('');
  const [CurrentPassword,setCurrentPassword]=useState('');
  const [newPassword,setnewPassword]=useState('');

    const {user} = useSelector(state=>state.user);
    const [email,setemail]=useState(user?.email);
    const [UserInfo,setUserInfo]=useState({
      FirstName:user?.FirstName,
      SecondName:user?.SecondName,
      gender:user?.gender,
    });
  
    const dispatch = useDispatch();
    const Maleref = useRef();
    const Femaleref = useRef();
    const CurrentP = useRef();
    const NewP = useRef();
    const Emailref =useRef();
    const FirstNref =useRef();
    const SecondNref =useRef();
    const ShowPassref = useRef();
    const DateRecieved = user?.createdAt;
    const date = new Date(DateRecieved);
    const JoinedAt= date.toLocaleString().split(',')[0];
    const id = user?._id;

    const FirstNameChange = (e)=>{

      
        setUserInfo((prevstate)=>(
        {
        ...prevstate,
        FirstName:e.target.value
      }
      ))
    
    }

    
    const SecondNameChange = (e)=>{
    
      
        setUserInfo((prevstate)=>(
        {
        ...prevstate,
        SecondName:e.target.value
      }
      ))
    
    }

    const HandleUpdateEmail = ()=>{
      if(email===''){
        Emailref.current.focus();
        seterror('Email Cannot Be Empty');
        setTimeout(()=>{
          seterror('');
          },3000);

      }else if(email===user?.email){
       seterror('Email Cannot be Same As Old Email');
       setTimeout(()=>{
        seterror('');
        },3000);
      }else{
        dispatch(EmailInfoUpdate(id,email));
        setShowAccountedit(false);
      }
      
    }


    useEffect(()=>{
     if(user?.gender==='Male'){
      Maleref.current.checked=true
     }else{
      Femaleref.current.checked=true
     }
    },[user?.gender,Maleref,Femaleref]);



    const HandleGenderChangeMale = ()=>{
     if(Maleref.current.checked===true){
      Femaleref.current.checked=false;
       setUserInfo((prevstate)=>(
      {
      ...prevstate,
      gender:'Male'
    }
    ))
   }
  }
  const HandleGenderChangeFemale=()=>{
   if(Femaleref.current.checked===true){
    Maleref.current.checked=false;
    setUserInfo((prevstate)=>(
      {
      ...prevstate,
      gender:'Female'
    }
    ))
   }
  }

  const HandlePersonalUpdate = ()=>{
    if(UserInfo.FirstName==='' || UserInfo.FirstName.length <3){
      FirstNref.current.focus();
      seterror('FirstName Should Be Atleast 3 Letters')
setTimeout(()=>{
seterror('');
},3000);
    }else if(UserInfo.SecondName==='' || UserInfo.SecondName.length <3){
      SecondNref.current.focus();
      seterror('LastName Should Be Atleast 3 Letters')
setTimeout(()=>{
seterror('');
},3000);
    }
else{
   dispatch(PersonalInfoUpdate(id,UserInfo.FirstName,UserInfo.SecondName,UserInfo.gender));
    setShowPersonalEdit(false);
  }
}

const HandlePasswordUpdate = ()=>{

if(CurrentPassword===''){
 CurrentP.current.focus();
}else if(newPassword===''){
  NewP.current.focus();
}


  if(CurrentPassword==='' || newPassword===''){
    seterror('Password Cannot be Empty');
    setTimeout(()=>{
      seterror('');
      },3000);
  }else if(CurrentPassword.length <8 || newPassword.length <8){
   seterror('Password Should be of Atleast 8 letters');
   setTimeout(()=>{
    seterror('');
    },3000);
  }else if(CurrentPassword===newPassword){
  seterror('NewPassword Cannot Be Same As CurrentPassword');
  setTimeout(()=>{
   seterror('');
  },3000);
  }
  else{
    dispatch(PasswordInfoUpdate(id,CurrentPassword,newPassword));
    setSuccess('Password Changed Successfully');
    setTimeout(()=>{
      setSuccess('');
      setCurrentPassword('');
      setnewPassword('');
    },2000)
    
    setTimeout(()=>{
      setShowPasswordedit(false);
      },300);
  }

}
    

    
  return (
    <div className='ProfileMainDiv'>
    
     <div className='LeftSideProfile'>
 
      <div className='LeftSideProfileContainer'>
        <div className='UserNameProfile'>
  
         <div className='UserProfileImg'>
           <img src={user?.gender==="Male"?MaleProfile:FemaleProfile} alt='Account' />
        </div>
  
        <div className='UserName'>
        <h3>Hello {user?.FirstName + ' ' + user?.SecondName}!</h3>
        </div>
        </div>

        <div className='MyOrders'>
        <h3>My Orders</h3>
        <GrFormNext size={40}/>
        </div>
      </div>
 
     </div>
 
    <div className='RightSideProfile'>
        
        <div className='RightSideProfileContainer'>
       
        <div className='UserNameInfo'>
        <div className='PersonalEdit'>
            <p>Personal Information :</p>
            <span onClick={()=>{
              if(!ShowAccountEdit){
              setShowPersonalEdit(true);
              }
            }}>Edit</span>
            </div>
            <div className='NameInfo'>
         <div className='UserFirstName'>
            <h3>FirstName :</h3>
            <span>{user?.FirstName}</span>
        </div>

        <div className='UserSecondName'>
            <h3>LastName :</h3>
            <span>{user?.SecondName}</span>
        </div>   
            </div>
         </div> 

         <div className='UserGenderInfo'>
            <div className='UsersGender'>
           <h3>Gender :</h3>
           <span>{user?.gender}</span>
            </div>

            <div className='UserJoiningInfo'>
            <h3>Joined ShopPlaza: </h3>
            <span>{JoinedAt}</span>
            </div>
        </div> 

        <div className='UserPasswordInfo'>
          <div className='AccountInfoEdit'>
          <p>Account Information :</p>
          </div>
       <div className='AccountInfo'>
       
        <div className='EmailInfo'>
        <h3>Email : <span className='EditEmailTag' onClick={()=>{
            if(!ShowPersonalEdit){
              setShowAccountedit(true);
            }
          }}>Edit</span> </h3>
        
        
        <span>{user?.email}</span>
        </div>

        <div className='UpdateInfo'>
         <span onClick={()=>setShowPasswordedit(true)}>Update Password</span>
        </div>
        
       
        </div>
        </div>

        
        </div>

     </div>

      <div className='PersonalUpdate' style={{display:ShowPersonalEdit?'':'none'}}>
        <AiOutlineClose size={30} onClick={()=>{
          setShowPersonalEdit(false);
          setUserInfo((prevstate)=>({
            ...prevstate,
            FirstName:user?.FirstName,
            SecondName:user?.SecondName,
            gender:user?.gender
          }))}} className='ClosePersonalEdit'/>
       
       <div className='PersonalEditContainer'>
        <p>Edit Personal Information : </p>
         
         <div className='EditFirstName'>
          <h3>Edit FirstName :</h3>
          <input type='text' ref={FirstNref} value={UserInfo.FirstName} onChange={FirstNameChange}
          />
         </div>

         <div className='EditLastName'>
          <h3>Edit LastName :</h3>
          <input type='text' ref={SecondNref} value={UserInfo.SecondName} onChange={SecondNameChange}
          />
         </div>



         <div className='EditGender'>
          <h3>Gender :</h3>
          <div className='CurrentGender'>
          <span>Male</span>
          <input type='checkbox' ref={Maleref}  onClick={HandleGenderChangeMale}/>
         </div>
         <div  className='ChangeGender'>
          <span>Female</span>
          <input type='checkbox' ref={Femaleref}  onClick={HandleGenderChangeFemale} />
         </div>
         </div>
            <span className='EditError' style={{display:error!==''?'':'none'}}> {error}</span>
         <div className='UpdateProfilebtn'>
          <button onClick={HandlePersonalUpdate}>Update Personal Information</button>
         </div>

       </div>

      </div>

      <div className='AccountEdit' style={{display:ShowAccountEdit?'':'none'}}>
       <div className='AccountEditcontainer'>
         <AiOutlineClose onClick={()=>{
          setShowAccountedit(false);
          setemail(user?.email);
          }} className='CloseAccountEdit' size={35} />
       <h3>Edit Account Information :</h3>
       
        <div className='UpdateEmail'>
         <h3>Edit Email : </h3>
         <input ref={Emailref} type='email' placeholder={email} value={email} onChange={(e)=>setemail(e.target.value)} />
        </div>
            <span className='EmailEditError'>{error}</span>
        <div className='UpdateEmailbtn'>
        <button onClick={HandleUpdateEmail}>Update Email</button>
        </div>
        

      
       </div>
      </div>

      <div className='PasswordEdit' style={{display:ShowPasswordedit?'':'none'}}>
        <AiOutlineClose className='ClosePasswordedit' size={35} onClick={()=>{
          setShowPasswordedit(false);
          setCurrentPassword('');
          setnewPassword('');
          setShowPassword(false);
          ShowPassref.current.checked=false;
          }}/>
       <h3>Change Password :</h3>

       <div className='CurrentPassword'>
        <h3>Current Password :</h3>
        <input ref={CurrentP} type={ShowPassword?'text':'password'} value={CurrentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} />
       </div>

       <div className='newPassword'>
        <h3>New Password :</h3>
        <input type={ShowPassword?'text':'password'} ref={NewP} value={newPassword} onChange={(e)=>setnewPassword(e.target.value)} />
       </div>
         <span className='PasswordEditerror' style={{color:error!==''?'tomato':'lightgreen'}} >{error!==''?error:Success}</span>
        <div className='ShowPassword'>
        <input type='checkbox' ref={ShowPassref}  onClick={()=>setShowPassword(!ShowPassword)}/>
        <span>Show Password</span>
       </div>
       <span className='ForgotPassword'>Forgot CurrentPassword?</span>
       <div className='UpdatePasswordButton'>
        <button onClick={HandlePasswordUpdate}>Update Password</button>
       </div>
      </div>

    </div>
  )
}

export default Profile