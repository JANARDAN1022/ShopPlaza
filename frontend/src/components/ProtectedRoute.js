import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const ProtectedRoute = ({Component,Element,StripePromise}) => {
const {loading,isAuthenticated} = useSelector(state=>state.user);
const Navigate = useNavigate();
useEffect(()=>{
    if(loading===false && !isAuthenticated){
     Navigate('/Login');
     console.log('Please Login');
    }
},[isAuthenticated,Navigate,loading]);

return (
    Element?
    <Element stripe={StripePromise}>
        <Component />
    </Element>
    :
<Component />
 )
}

export default ProtectedRoute;