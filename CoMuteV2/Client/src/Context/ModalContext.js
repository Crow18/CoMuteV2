import { createContext, useContext, useState } from "react";
import React from 'react';
import Modal from '../Components/Shared/Modal';

const ModalContextObj = createContext({
  Visibility: false,
  Message: {Body: "test", Header: "oi Test"}, 
  ActionType: "Option",
  ActionHandler: null,
  DynamicComponent: null,
});

export const useModal = () => {
  return useContext(ModalContextObj)
};


const ModalContext = ({children}) => {
  const [modalCtxt, setModalCtxt] = useState(useModal());
  const timeout = process.env.REACT_APP_SET_NOTIFICATION_TIMEOUT;
  
  const resetContext = () => {    
    setModalCtxt(ModalContextObj);
  }

  const setProceedOption = (messageHeader, messageBody, proceedAction) => { 
    resetContext();
    setModalCtxt({...modalCtxt, ActionType: "Option", Message: {Header: messageHeader, Body: messageBody}, Visibility: true, ActionHandler: proceedAction});
  }

  const setNotification = (messageHeader, messageBody) => {
    resetContext();
    setModalCtxt({...modalCtxt, ActionType: "Notification", Message: {Header: messageHeader, Body: messageBody}, Visibility: true});
    setTimeout(() => {resetContext()}, timeout);
  }

  const setCustom = (component) => {
    resetContext();
    setModalCtxt({ActionType: "Custom", Visibility: true, DynamicComponent: component});
  }

  return (
    <ModalContextObj.Provider value={{modalCtxt,setModalCtxt, setProceedOption, setNotification, setCustom, resetContext}}>
      <Modal />
       {children}
    </ModalContextObj.Provider>

  )
};

export default ModalContext;