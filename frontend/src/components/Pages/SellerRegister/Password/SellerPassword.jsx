import React, { useRef, useState } from "react";
import "./SellerPassword.css";
import { useContext } from "react";
import { SellerContext } from "../../../../Context/SellerContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineLine } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const SellerPassword = () => {
  const { SellerPassword, setSellerPassword } = useContext(SellerContext);
  const [ShowPass, setShowPass] = useState(false);
  const [ShowConfirm, setShowConfirm] = useState(false);
  const [ConfirmPass, setConfirmPass] = useState("");
  const [error,seterror]=useState('');
  const PassRef = useRef();
  const ConfirmRef = useRef();
  const Navigate = useNavigate();

  const HandlePassChange = (e) => {
    setSellerPassword(e.target.value);
    if(e.target.value.length>=6){
    PassRef.current.style.outlineColor='green';
    }else{
        PassRef.current.style.outlineColor='red'
    }  
}

const HandleConfrimChange = (e)=>{
    setConfirmPass(e.target.value);
    ConfirmRef.current.style.outlineColor = 'black';
}

  const HandleContinuePass = ()=>{
     if(SellerPassword==='' || (SellerPassword==='' && ConfirmPass==='')){
        PassRef.current.focus();
        PassRef.current.style.outlineColor = 'red';
        seterror('Password Cannot Be Empty');
        setTimeout(() => {
            seterror('');
        }, 3000);
     }else
     if(ConfirmPass===''){
        ConfirmRef.current.focus();
        ConfirmRef.current.style.outlineColor = 'red';
        seterror('Confirm Your Password');
        setTimeout(() => {
            seterror('');
        }, 3000);
     }else
      if(SellerPassword.length<6){
        seterror('Password Should Be Atleast 6 Letters')
        setTimeout(() => {
            seterror('')
        }, 3000);
     }
     else if(SellerPassword!==ConfirmPass){
        ConfirmRef.current.focus();
        ConfirmRef.current.style.outlineColor='red';
         seterror('Password Do Not Match');
         setTimeout(() => {
            seterror('')
        }, 3000);
     }
     if(SellerPassword!=='' && ConfirmPass!=='' && SellerPassword===ConfirmPass && SellerPassword.length>=6){
        Navigate('/OnBoarding-Dashboard');
     }
  }

  return (
    <div className="CreateSellerPass">
      <div className="ContainerSellerPass">
        <div className="SellerPassStageContainer">
          <div className="SellerPassNavLeft">
            <h3>
              <Link to="/">
                <i>ShopPlaza</i>
              </Link>{" "}
            </h3>
          </div>
          <div className="SellerPassStage">
            <div className="EmailStage">
              <BsCheckCircle size={20} />
              <span>Email & Category Selection</span>
            </div>

            <div className="Dash">
              <AiOutlineLine size={30} />
            </div>

            <div className="PasswordStage">
              <BsCheckCircle size={20} />
              <span>Password Creation</span>
            </div>

            <div className="Dash">
              <AiOutlineLine size={30} />
            </div>

            <div className="DashBoardStage">
              <BsCheckCircle size={20} />
              <span>DashBoard</span>
            </div>
          </div>
        </div>

        <div className="SellerPassContent">
          <h3>Create a Strong Password For Your Seller Account</h3>
          <div className="SellerinputFields">
            <div className="SellerPasswordInputs">
              <input
              ref={PassRef}
                name="SellerPassword"
                type={ShowPass ? "text" : "password"}
                value={SellerPassword}
                onChange={HandlePassChange}
                placeholder="Create a New Password"
              />
              {ShowPass ? (
                <AiOutlineEye size={20} onClick={() => setShowPass(false)} />
              ) : (
                <AiOutlineEyeInvisible
                  size={20}
                  onClick={() => setShowPass(true)}
                />
              )}
            </div>
            <div className="ConfirmPassInputs">
              <input
              ref={ConfirmRef}
                name="ConfirmSellerPassword"
                type={ShowConfirm ? "text" : "password"}
                value={ConfirmPass}
                onChange={HandleConfrimChange}
                placeholder="Confirm  Password"
              />
              {ShowConfirm ? (
                <AiOutlineEye size={20} onClick={() => setShowConfirm(false)} />
              ) : (
                <AiOutlineEyeInvisible
                  size={20}
                  onClick={() => setShowConfirm(true)}
                />
              )}
            </div>
          </div>
             <button className="CreatePassBTN" onClick={HandleContinuePass}>Create Password & Continue</button>
             <span style={{display:error!==''?'':'none',color:'red',fontSize:'18px'}}>{error}</span>
      
        </div>
      </div>
    </div>
  );
};

export default SellerPassword;
