import React, { useContext, useState } from 'react'
import {IoEyeOutline, IoEyeOffOutline} from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../../Context/LoginContext';
import useHttp from '../../Hooks/useHttp';
import useLocalStorage from '../../Hooks/useLocalStorage';
import {LoginRegisterPage, LoginRegisterContainer, LoginInputContainer, LoginRegisterHeader,LoginRegisterButton, LoginRegisterLabel ,LoginRegisterInput, LoginRegisterInputSegment } from '../../Styled/LoginRegister.elements'
import Loading from '../Shared/Loading';

function Login() {
    const navigate = useNavigate();
    const loginStatus = useContext(LoginContext);
    const [showPassword, setShowPassword] = useState(false)
    const [inputData, setInputData] = useState({});
    const [doRequest, loading] = useHttp();
    const [getLocalStorageItem, setLocalStorageItem, clearLocalStorage] = useLocalStorage();


    const doLogin = (response) => {
      if(response.error.length > 0)
      {
        return console.log("err", response.error);//add case for modal
      }
      if(response.data)
      {
        clearLocalStorage();
        setLocalStorageItem("userData", response.data);
        loginStatus.setLoggedIn(true);
        navigate("/"); 
      }
    };


    const signIn = async () =>
    {        
        const data = await doRequest(process.env.REACT_APP_LOGINUSER_ENDPOINT, 'POST', JSON.stringify(inputData));
        doLogin(data);       
    };
    
    const handleInputChange = (e) => {
      setInputData({...inputData, [e.target.name]: e.target.value});;
    };

    const handleShowPassword = () => {
      setShowPassword(showPassword => !showPassword);
    }

  return (
    <LoginRegisterPage>
      <LoginRegisterContainer>
        <LoginRegisterHeader>Login</LoginRegisterHeader>
        <LoginInputContainer>
          <LoginRegisterLabel >Email</LoginRegisterLabel>
          <LoginRegisterInput name ="email" onChange={handleInputChange}/>
          <LoginRegisterLabel >Password</LoginRegisterLabel>
          <LoginRegisterInputSegment>
            <LoginRegisterInput type={showPassword ? 'text' : 'password'} name ="password" onChange={handleInputChange}/>
            <span onClick={handleShowPassword}>{!showPassword ? <IoEyeOutline/> : <IoEyeOffOutline/>}</span> 
          </LoginRegisterInputSegment>
          {
            loading? <Loading /> :
            <>
              <LoginRegisterButton onClick={signIn}>Login</LoginRegisterButton> 

              <LoginRegisterInputSegment>
                <LoginRegisterLabel >Dont have an Account?</LoginRegisterLabel>
                <LoginRegisterButton onClick={() => navigate("/register")}>Register</LoginRegisterButton>
              </LoginRegisterInputSegment>
            </>
          }
        </LoginInputContainer>
      </LoginRegisterContainer>
    </LoginRegisterPage>
  )
}

export default Login