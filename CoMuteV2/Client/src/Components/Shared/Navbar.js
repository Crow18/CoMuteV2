import React, { useContext, useState } from 'react';
import { LoginContext } from '../../Context/LoginContext';
import { ThemeContext } from '../../Context/ThemeContext';
import { Navibar, NavibarLink, NaviButton } from "../../Styled/Navbar.elements";
import {IoMoonSharp, IoSunnySharp} from 'react-icons/io5';
import useLocalStorage from '../../Hooks/useLocalStorage';

const Navbar = () => {
    const loggedInStatus = useContext(LoginContext);
    const theme = useContext(ThemeContext);
    const [showInfo, setShowInfo] = useState(false);
    const [getLocalStorageItem, setLocalStroageItem, clearLocalStorage] = useLocalStorage();

    const SwitchTheme = () => {
      theme.setThemeMode(!theme.themeMode);
    }

    const doShowAction = (value) =>{
      setShowInfo(value);
    }

    const LogOut = () =>
    {
      clearLocalStorage();
      loggedInStatus.setLoggedIn(false);
    }

    const Icon = () => {
      return(
        <>
          <p>{showInfo? "set theme" : null}</p>
          <i>{theme.themeMode ? <IoSunnySharp/>: <IoMoonSharp/>}</i>
        </>
      );
    }
    
  return (
   <Navibar>
    <NavibarLink to ="/" >My Co-Mutes</NavibarLink>
    <NavibarLink to ="/findCommutes" >Find Co-Mutes</NavibarLink>
    <NavibarLink to ="/profile" >Profile</NavibarLink>
    <NaviButton icon onClick={SwitchTheme} onMouseOver={() =>doShowAction(true)} onMouseLeave={() =>doShowAction(false)}>{<Icon/>}</NaviButton>
    <NaviButton onClick={LogOut}>Sign Out</NaviButton>
   </Navibar>
  )
}

export default Navbar