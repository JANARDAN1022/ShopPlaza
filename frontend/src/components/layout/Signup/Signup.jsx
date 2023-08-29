import React, { useState, useRef } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import CategoryCommon from "../../Categories/CommonCategory/CategoryCommon";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../../Actions/UserAction";

const Signup = () => {
  const [FirstName, setFirstName] = useState("");
  const [SecondName, setSecondName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [gender, setGender] = useState("");
  const [Loading,setLoading]=useState(false);
  const Maleref = useRef();
  const Femaleref = useRef();

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const redirect = window.location.search?window.location.search.split("=")[1]:'';
  
  
  const HandleRegister = async(e) => {
    e.preventDefault();

    const isAnyFieldEmpty = email === "" || password === "" || FirstName === "" || SecondName === "";
    const isGenderNotSelected = gender === "";

    if (isAnyFieldEmpty || isGenderNotSelected) {
      const errorMessageText = isGenderNotSelected ? "Please select gender" : "Please Enter All Fields";
      seterrorMessage(errorMessageText);
      setTimeout(() => {
        seterrorMessage("");
      }, 3000);
    } else if ((error==="Please login" || !error) && errorMessage === ""){
      setLoading(true);
     const response = await dispatch(RegisterUser(FirstName, SecondName, email, password, gender));
     if(response.success){
      setLoading(false);
     setFirstName("");
      setSecondName("");
      setemail("");
      setpassword("");
      Navigate(`/${redirect}`);
     }else{
      setLoading(false);
      setFirstName("");
      setSecondName("");
      setemail("");
      setpassword("");
      seterrorMessage('Server Error Please Try Again or Try later');
     }
    } else if (error) {
      seterrorMessage("User Already Exists");
      setTimeout(() => {
        seterrorMessage("");
      }, 3000);
    }
  };
  

  return (
    <div className="SignupMainDiv">
      <div className="SignupCategoryHead">
        <CategoryCommon />
      </div>

      <div className="SignupCard">
        <div className="SignupContainer">
          <div className="SignupLeftDiv">
            <div className="signupLeftDivContainer">
              <h2>Looks like you're new here!</h2>
              <span className="SignupLEftDivTEXT">
                Sign up with your email to get started
              </span>
            </div>
          </div>

          <div className="signupRightDiv">
            <div className="signupRightDivcontainer">
              <form className="SignupForm">
                <div className="FirstNameInput">
                  <input
                    autoComplete="off"
                    value={FirstName}
                    name="FirstName"
                    placeholder=" FirstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="SecondNameInput">
                  <input
                    autoComplete="off"
                    value={SecondName}
                    name="SecondName"
                    placeholder=" LastName"
                    type="text"
                    onChange={(e) => setSecondName(e.target.value)}
                  />
                </div>

                <div className="emailInput">
                  <input
                    autoComplete="off"
                    value={email}
                    name="email"
                    placeholder=" Your email"
                    type="email"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>

                <div className="passwordInput">
                  <input
                    autoComplete="off"
                    value={password}
                    placeholder="password"
                    name="password"
                    type="password"
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <span>{errorMessage}</span>
                <div className="GenderInput">
                  <span className="SelectGender">Select Your Gender :</span>
                  <div className="MaleGenderDiv">
                    <span>Male</span>
                    <input
                      type="checkbox"
                      name="MaleGender"
                      ref={Maleref}
                      onClick={() => {
                        Femaleref.current.checked = false;
                        if (Maleref.current.checked === true) {
                          setGender("Male");
                        } else {
                          setGender("");
                        }
                      }}
                    />
                  </div>

                  <div className="FemaleGenderDiv">
                    <span>Female</span>
                    <input
                      type="checkbox"
                      name="FemaleGender"
                      ref={Femaleref}
                      onClick={() => {
                        Maleref.current.checked = false;
                        if (Femaleref.current.checked === true) {
                          setGender("Female");
                        } else {
                          setGender("");
                        }
                      }}
                    />
                  </div>
                </div>
               <div className="RegisterButtonDiv">
               <button className="SignupButton" onClick={HandleRegister}>
                  Signup
                </button>
                <span style={{display:Loading || loading?'':'none'}} className="loader"></span>
                </div>
              </form>

              <div className="LoginLink">
                <Link to="/Login">Already a User ? Login to Your Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
