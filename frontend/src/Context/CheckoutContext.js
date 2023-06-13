import {createContext, useState,useEffect} from 'react';

export const CheckoutContext = createContext();

export const CheckoutContextProvider = ({children})=>{
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod,setPaymentMethod]=useState(null);

  // Load the selected address and payment method from session storage on component mount
  useEffect(() => {
    const savedAddress = JSON.parse(sessionStorage.getItem('selectedAddress'));
    const savedPaymentMethod = sessionStorage.getItem('paymentMethod');
    
    if (savedAddress) {
      setSelectedAddress(savedAddress);
    }
    
    if (savedPaymentMethod) {
      setPaymentMethod(savedPaymentMethod);
    }
  }, []);
  
  // Update session storage whenever the selected address or payment method changes
  useEffect(() => {
    const cookieOptions = {
        sameSite: 'none',
        secure: true,
      };
    sessionStorage.setItem('selectedAddress', JSON.stringify(selectedAddress),cookieOptions);
    sessionStorage.setItem('paymentMethod', paymentMethod,cookieOptions);
  }, [selectedAddress, paymentMethod]);
   
    

    

    return(
        <CheckoutContext.Provider value={{selectedAddress,setSelectedAddress,paymentMethod,setPaymentMethod}} >{children}</CheckoutContext.Provider>
    )
}