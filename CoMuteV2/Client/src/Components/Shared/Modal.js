import React, { useEffect } from 'react';
import { ModalPopUp, ModalNotification, ModalPopUpContent, ModalPopUpContentHeader, ModalPopUpContentMessage, ModalPopUpContentSegment, ModalCustomContainer } from '../../Styled/Modal.elements';
import {CommuteItemButton} from '../../Styled/CarPoolItem.elements';
import {useModal} from '../../Context/ModalContext';


            
const Modal = () => {

    const ctxt = useModal().modalCtxt;
    const ctxtHandler = useModal();
    

    const toggleModalVisibility = (visible) => {
        ctxtHandler.setModalCtxt({...ctxt, Visibility: visible});
    }

    const doProceed = () => {
        toggleModalVisibility(false);
        ctxt.ActionHandler();
        ctxtHandler.resetContext();
    }

    switch(ctxt.ActionType)
    {
        case "Option":
            return (
                <ModalPopUp Visible={ctxt.Visibility}>                    
                <ModalPopUpContent>
                    <ModalPopUpContentHeader>{ctxt.Message.Header}</ModalPopUpContentHeader>
                    <ModalPopUpContentMessage>{ctxt.Message.Body}</ModalPopUpContentMessage>                    
                    <ModalPopUpContentSegment>
                        <CommuteItemButton alternative onClick ={() => toggleModalVisibility(false)}>Cancel</CommuteItemButton>
                        <CommuteItemButton onClick={doProceed}>Proceed</CommuteItemButton>
                    </ModalPopUpContentSegment>
                </ModalPopUpContent>
                </ModalPopUp>
            );

        case "Notification":
            return(                
                <ModalNotification>
                    <h4>{ctxt.Message.Header}</h4>
                    <p>{ctxt.Message.Body}</p>
                </ModalNotification>
            );

        case "Custom":
            return(
                <ModalPopUp Visible={ctxt.Visibility}>
                    <ModalCustomContainer>
                        <>
                            {ctxt.DynamicComponent()}
                            <section>
                                <CommuteItemButton alternative onClick ={() => toggleModalVisibility(false)}>Close</CommuteItemButton>
                            </section>
                        </>
                    </ModalCustomContainer>                    
                </ModalPopUp>
            );
    }
}

export default Modal