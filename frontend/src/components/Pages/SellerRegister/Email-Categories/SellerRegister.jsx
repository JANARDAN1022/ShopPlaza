import React, { useRef, useState } from "react";
import "./SellerRegister.css";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircle,BsArrowRight } from "react-icons/bs";
import { AiOutlineLine } from "react-icons/ai";
import { useContext } from "react";
import { SellerContext } from "../../../../Context/SellerContext";

const SellerRegister = () => {
  const [Error,setError]=useState('');
  const  {SellerEmail,setSellerEmail,Category,setCategory}=useContext(SellerContext);
  const AllCategoriesRef = useRef();
  const SellerEmailRef = useRef();
  const Navigate = useNavigate();
  console.log(Category.includes('All Categories'));


  const toggleCategory = (category) => {
    if (Category.includes(category)) {
      if (category === "All Categories") {
        AllCategoriesRef.current.style.backgroundColor = "";
        AllCategoriesRef.current.style.color = "";
      }
      setCategory(Category.filter((cat) => cat !== category));
    }else {
      if (category === "All Categories") {
        setCategory([`${category}`]);
        AllCategoriesRef.current.style.backgroundColor =
          "rgba(0, 102, 204,0.2)";
        AllCategoriesRef.current.style.color = "white";
      } else {
        if (Category.includes("All Categories")) {
          AllCategoriesRef.current.style.backgroundColor = "";
          AllCategoriesRef.current.style.color = "";
          const RemoveAllCategory = Category.filter(
            (cat) => cat !== "All Categories"
          );
          setCategory([...RemoveAllCategory, category]);
        }else
        if (
          Category.length >= 5 &&
          Category.includes("All Categories") === false
        ) {
          setCategory(["All Categories"]);
          AllCategoriesRef.current.style.backgroundColor =
            "rgba(0, 102, 204,0.2)";
          AllCategoriesRef.current.style.color = "white";
        } else {
          setCategory([...Category, category]);
        }
      }
    }
  };

  const HandleRegisterSeller = ()=>{
    const CheckEmail = SellerEmail.split('@');
    const CheckDot = CheckEmail[1]?.split('.');
    if(SellerEmail===''){
          SellerEmailRef.current.focus();
          SellerEmailRef.current.style.outlineColor = 'red';      
  }else 
  if(CheckEmail.length===1 || CheckEmail[0]==='' || CheckEmail[1]==='' || CheckDot.length===1 || CheckDot[1]===''){
    SellerEmailRef.current.focus();
    SellerEmailRef.current.style.outlineColor = "red";
    setError('Please Enter A Valid Email');
    setTimeout(() => {
      setError('');
    }, 3000);
  }else 
  if(Category.length===0){
     setError('Please Select Either Specific or All Categories');
     setTimeout(() => {
      setError('');
     }, 3000);
  }else 
  if(SellerEmail!=='' && Category.length>=1){
     Navigate(`/PasswordCreation`);
  }

}



  return (
    <div className="SellerRegisterMain">
      <div className="SRcontainer">
        <div className="SRnav">
          <div className="SRnavContainer">
            <div className="SRnavLeft">
              <h3>
                <Link to="/">
                  <i>ShopPlaza</i>
                </Link>{" "}
              </h3>
            </div>

            <div className="SRnavMiddle">
              <div className="EmailMiddle">
                <BsCheckCircle size={20} />
                <span>Email & Category Selection</span>
              </div>

              <div className="Dash">
                <AiOutlineLine size={30} />
              </div>

              <div className="PasswordMiddle">
                <BsCheckCircle size={20} />
                <span>Password Creation</span>
              </div>

              <div className="Dash">
                <AiOutlineLine size={30} />
              </div>

              <div className="DashBoardMiddle">
                <BsCheckCircle size={20} />
                <span>DashBoard</span>
              </div>
            </div>
          </div>
        </div>

        <div className="SellerInputs">
          <div className="SellerEmailInput">
            <input
            name="SellerEmail"
            ref={SellerEmailRef}
              type="email"
              placeholder="Email Id"
              value={SellerEmail}
              onChange={(e) => {
                
                const EmailCheck = e.target.value.split('@');
                const DotCheck = EmailCheck[1]?.split('.');
                if(EmailCheck.length===2 && EmailCheck[0]!=='' && EmailCheck[1]!=='' && DotCheck.length===2 && DotCheck[1]!=='' ){
                  SellerEmailRef.current.style.outlineColor='green';
                }else{
                  SellerEmailRef.current.style.outlineColor='red';
                }
                setSellerEmail(e.target.value)}}
            />
            <span className="RequiredMark">*</span>
          </div>
          <div className="CategorySelection">
            <span>What are you looking to sell on ShopPlaza?</span>
            <div className="AvailableCategories">
              <div
                ref={AllCategoriesRef}
                onClick={() => toggleCategory("All Categories")}
                style={{backgroundColor:Category.includes("All Categories")?"rgba(0, 102, 204,0.2)":"",color:Category.includes("All Categories")?'white':''}}
              >
                All Categories
              </div>

              <div
                style={{
                  backgroundColor: Category.includes("Electronics")
                    ? "rgba(0, 102, 204,0.2)"
                    : "",
                  color: Category.includes("Electronics") ? "white" : "",
                }}
                onClick={() => toggleCategory("Electronics")}
              >
                Electronics
              </div>

              <div
                style={{
                  backgroundColor: Category.includes(
                    "Beauty, Food, Toys & more"
                  )
                    ? "rgba(0, 102, 204,0.2)"
                    : "",
                  color: Category.includes("Beauty, Food, Toys & more")
                    ? "white"
                    : "",
                }}
                onClick={() => toggleCategory("Beauty, Food, Toys & more")}
              >
                Beauty, Food, Toys & more
              </div>

              <div
                style={{
                  backgroundColor: Category.includes("Fashion/Clothes")
                    ? "rgba(0, 102, 204,0.2)"
                    : "",
                  color: Category.includes("Fashion/Clothes") ? "white" : "",
                }}
                onClick={() => toggleCategory("Fashion/Clothes")}
              >
                Fashion/Clothes
              </div>

              <div
                style={{
                  backgroundColor: Category.includes(
                    "Sports, Healthcare & more"
                  )
                    ? "rgba(0, 102, 204,0.2)"
                    : "",
                  color: Category.includes("Sports, Healthcare & more")
                    ? "white"
                    : "",
                }}
                onClick={() => toggleCategory("Sports, Healthcare & more")}
              >
                Sports, Healthcare & more
              </div>

              <div
                style={{
                  backgroundColor: Category.includes("Vacay Travel Essentials")
                    ? "rgba(0, 102, 204,0.2)"
                    : "",
                  color: Category.includes("Vacay Travel Essentials")
                    ? "white"
                    : "",
                }}
                onClick={() => toggleCategory("Vacay Travel Essentials")}
              >
                Vacay Travel Essentials
              </div>

              <div
                style={{
                  backgroundColor: Category.includes(
                    "Home & Kitchen Essentials"
                  )
                    ? "rgba(0, 102, 204,0.2)"
                    : "",
                  color: Category.includes("Home & Kitchen Essentials")
                    ? "white"
                    : "",
                }}
                onClick={() => toggleCategory("Home & Kitchen Essentials")}
              >
                Home & Kitchen Essentials
              </div>
            </div>
          </div>
          <span style={{visibility:Error!==''?'':'hidden',color:'red',marginLeft:'50px',fontSize:'18px'}}>{Error}</span>
           <div className="RegisterSeller">
          <button className="RegisterSellerBTN" onClick={HandleRegisterSeller}>Register And Continue</button>
         <BsArrowRight size={25} />
         </div>
        </div>
   
           <div className="WhySell">
             <div className="WhySellContainer">
              <h1>Why sell on ShopPlaza?</h1>
              <div className="ReasonsForWhy">
                <div className="Reason">
                  <div className="WhySellImage">
                  <img src="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Truck.svg" alt="Truck.img" />
                </div>
                <h4>Sell Across India</h4>
                <span>Reach over 50 crore + customers across 27000 + pincodes</span>
                </div>

                <div className="Reason">
                  <div className="WhySellImage">
                  <img src="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Percent.svg" alt="Truck.img" />
                </div>
                <h4>Higher Profits</h4>
                <span>With 0% commission* , you take 100% profits with you</span>
                </div>

                <div className="Reason">
                  <div className="WhySellImage">
                  <img src="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Account.svg" alt="Truck.img" />
                </div>
                <h4>Account Management</h4>
                <span>Our Dedicated managers will help your business on Flipkart</span>
                </div>

                <div className="Reason">
                  <div className="WhySellImage">
                  <img src="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Charges.svg" alt="Truck.img" />
                </div>
                <h4>Lower Return Charges</h4>
                <span>With our flat and low return charges, ship your products stress-free</span>
                </div>

                <div className="Reason">
                  <div className="WhySellImage">
                  <img src="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Calculator.svg" alt="Truck.img" />
                </div>
                <h4>Simple Pricing Calculator</h4>
                <span>Use our simple pricing calculator to decide the best and competitive selling price for your product</span>
                </div>

                <div className="Reason">
                  <div className="WhySellImage">
                  <img src="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Support.svg" alt="Truck.img" />
                </div>
                <h4>24x7 Seller Support</h4>
                <span>All your queries and issues are answered by our dedicated Seller Support Team</span>
                </div>

                <div className="Reason">
                  <div className="WhySellImage">
                  <img src="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Payments.svg" alt="Truck.img" />
                </div>
                <h4>Fast & Regular Payments</h4>
                <span>Get payments as fast as 7-10 days from the date of dispatch</span>
                </div>

                <div className="Reason">
                  <div className="WhySellImage">
                  <img src="https://img1a.flixcart.com/fk-sp-static/images/Onboarding_logo_Mobile.svg" alt="Truck.img" />
                </div>
                <h4>Business on the go</h4>
                <span>Download our Flipkart Seller App to manage your business anywhere, anytime</span>
                </div>

                </div>
             </div>
           </div>

      </div>
    </div>
  );
};

export default SellerRegister;
