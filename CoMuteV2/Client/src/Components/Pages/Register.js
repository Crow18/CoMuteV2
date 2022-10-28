import React, {useState} from 'react';
import {IoEyeOutline, IoEyeOffOutline} from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import useHttp from '../../Hooks/useHttp';
import useLocalStorage from '../../Hooks/useLocalStorage';
import {LoginRegisterPage, LoginRegisterContainer, LoginInputContainer, LoginRegisterHeader,LoginRegisterButton, LoginRegisterLabel ,LoginRegisterInput, LoginRegisterInputSegment } from '../../Styled/LoginRegister.elements'
import Loading from '../Shared/Loading';

function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [inputData, setInputData] = useState({});
    const [doRequest, loading] = useHttp();

    const handleInputChange = (e) => {
      setInputData({...inputData, [e.target.name]: e.target.value});;
    };

    const handleShowPassword = () => {
      setShowPassword(showPassword => !showPassword);
    }

    const doSignUp = async() => {
      const newUser = await doRequest(process.env.REACT_APP_REGISTERNEWUSER_ENDPOINT, 'POST', JSON.stringify(inputData));
    }

  return (
    <LoginRegisterPage>
      <LoginRegisterContainer>
        <LoginRegisterHeader>Register</LoginRegisterHeader>
        <LoginInputContainer>
          <LoginRegisterLabel >Name</LoginRegisterLabel>
          <LoginRegisterInput name ="name" onChange={handleInputChange}/>

          <LoginRegisterLabel >Surname</LoginRegisterLabel>
          <LoginRegisterInput name ="surname" onChange={handleInputChange}/>

          <LoginRegisterLabel >Phone</LoginRegisterLabel>
          <LoginRegisterInput name ="phone" onChange={handleInputChange}/>

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
              <LoginRegisterButton onClick={async() => {await doSignUp()}}>SignUp</LoginRegisterButton> 
             
              <LoginRegisterInputSegment>
                <LoginRegisterLabel >Have an Account?</LoginRegisterLabel>
                <LoginRegisterButton onClick={() => navigate("/login")}>Login</LoginRegisterButton>
              </LoginRegisterInputSegment>
            </>
          }
        </LoginInputContainer>
        

        {/* //set to load */}
      </LoginRegisterContainer>
    </LoginRegisterPage>
  )
}

export default Register