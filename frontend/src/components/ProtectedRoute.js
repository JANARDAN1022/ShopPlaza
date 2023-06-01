import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const ProtectedRoute = ({Component}) => {
const {isAuthenticated} = useSelector(state=>state.user);
const Navigate = useNavigate();
useEffect(()=>{
    if(!isAuthenticated){
     Navigate('/Login')
    }
},[isAuthenticated,Navigate]);

return (
<Component />
 )
}

export default ProtectedRoute;