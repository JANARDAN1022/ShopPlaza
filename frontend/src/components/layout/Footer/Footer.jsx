import React from 'react';
import './Footer.css';
import {AiFillQuestionCircle} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='FooterMainDiv'>
      <div className='FooterContainer'>

        <div className='FooterInfoDiv'>
      
      <div className='FooterAboutSec'>
        
        <div className='AboutHead'>
        <h4>About</h4>
        </div>

        <div className='AboutInfo'>
        <h4>Contact Us</h4>
        <h4>About Us</h4>
        <h4>Careers</h4>
        <h4>ShopPlaza Stories</h4>
        <h4>Press</h4>
        <h4>ShopPlaza WholeSale</h4>
        <h4>Corporate Information</h4>
        </div>


      </div>

      <div className='FooterHelpSec'>

        <div className='HelpHead'>
        <h4>HELP</h4>
        </div>

        <div className='HelpContent'>
           <h4>Payments</h4>
           <h4>Shipping</h4>
           <h4>Cancellation {`&`} Returns</h4>
           <h4>FAQ</h4>
           <h4>Report Infringement</h4>
        </div>

      </div>

        <div className='FooterConsumerPolicySec'>
             
             <div className='ConsumerPolicyHead'>
            <h4>CONSUMER POLICY</h4>
             </div>
        
        <div className='ConsumerPolicyContent'>
          <h4>Return Policy</h4>
          <h4>Terms oF Use</h4>
          <h4>Security</h4>
          <h4>Privacy</h4>
          <h4>Sitemap</h4>
          <h4>Grievance Redressal</h4>
          <h4>EPR Compliance</h4>
        </div>

       </div>
 
        <div className='FooterSocialSec'>
            
            <div className='SocialHead'>
                <h4>SOCIAL</h4>
            </div>

            <div className='SocialContent'>
            <h4>Facebook</h4>
            <h4>Twitter</h4>
            <h4>YouTube</h4>
            </div>


         </div>

        
         </div>

         <div className='FooterBecomeSellerDiv'>
                
                <div className='SellerContainer'>
                   
                   <div className='BecomeSellerHead'>
                   <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDE2IDE1Ij4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAlIiB4Mj0iODYuODc2JSIgeTE9IjAlIiB5Mj0iODAuMjAyJSI+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkQ4MDAiLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRkZBRjAwIi8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTS0yLTJoMjB2MjBILTJ6Ii8+CiAgICAgICAgPHBhdGggZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTUuOTMgNS42MTRoLTIuOTQ4VjQuMTRjMC0uODE4LS42NTUtMS40NzMtMS40NzMtMS40NzNIOC41NmMtLjgxNyAwLTEuNDczLjY1NS0xLjQ3MyAxLjQ3M3YxLjQ3NEg0LjE0Yy0uODE4IDAtMS40NjYuNjU2LTEuNDY2IDEuNDc0bC0uMDA3IDguMTA1YzAgLjgxOC42NTUgMS40NzQgMS40NzMgMS40NzRoMTEuNzljLjgxOCAwIDEuNDc0LS42NTYgMS40NzQtMS40NzRWNy4wODhjMC0uODE4LS42NTYtMS40NzQtMS40NzQtMS40NzR6bS00LjQyMSAwSDguNTZWNC4xNGgyLjk0OHYxLjQ3NHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yIC0yKSIvPgogICAgPC9nPgo8L3N2Zz4K' alt='bag' />
                   <h4>Become a Seller</h4>
                </div>
                
                <div className='HelpCentreHead'>
                <AiFillQuestionCircle size={30}/>
                <h4>Help Centre</h4>
                </div>

                <div className='CopyRightMark'>
                <h4>© 2007-2023 ShopPlaza.com</h4>
                </div>
                
                <div className='FooterCardimages'>
               <img src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg' alt='CardImgs' />
                </div>

                </div>


         </div>



      </div>


    </div>
  )
}

export default Footer