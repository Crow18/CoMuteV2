import React, {useContext} from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import Navbar from '../Components/Shared/Navbar';
import { LoginContext } from '../Context/LoginContext';
import ModalContext from '../Context/ModalContext';


const RequireAuth = () =>
{
  const loginStatus = useContext(LoginContext);


  return (
    loginStatus.loggedIn ?
    <>
      
        <Navbar />
        <ModalContext>
          <Outlet /> 
        </ModalContext>
     
    </> :
    <Navigate to="/login" />

  )
}

export default RequireAuth;