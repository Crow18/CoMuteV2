import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LoginContext } from "./Context/LoginContext";
import RequireAuth from "./Hooks/RequireAuth";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import Home from './Components/Pages/Home';
import NotFound from "./Components/Pages/NotFound";
import CreateCommute from "./Components/Pages/CreateCommute";
import FindCommutes from "./Components/Pages/FindCommutes";
import Profile from './Components/Pages/Profile';
import AppThemeContext from "./Context/AppThemeContext";
import {useLoadScript} from "@react-google-maps/api";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [themeMode, setThemeMode] = useState(true);

  useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY, libraries: ["places"]});

  return (
    <LoginContext.Provider value={{setLoggedIn, loggedIn}} >
      <AppThemeContext themeContextValue={{themeMode, setThemeMode}}>

      <Routes>
        <Route path="/" >
         
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register />}/>

          <Route element={<RequireAuth />} >
            
            <Route path="" element={<Home />}/> 
            <Route path="createCommute" element={<CreateCommute />}/>
            <Route path="findCommutes" element={<FindCommutes />}/>
            <Route path="profile" element={<Profile />}/>
          
          </Route>
          
          <Route path="*" element={<NotFound/>}/>

        </Route>
      </Routes>
      </AppThemeContext>
    </LoginContext.Provider>
  );
}

export default App;
