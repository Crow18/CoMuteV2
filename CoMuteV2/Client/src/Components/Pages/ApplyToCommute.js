import React, { useRef, useState } from 'react';
import {PageContainer, PageHeader} from '../../Styled/Page.elements';
import { ModalCustomItemContainer, ModalPopUpContentSegment } from '../../Styled/Modal.elements';
import { CommuteItemInputTextArea, CommuteItemButton, CommuteItemInfo } from '../../Styled/CarPoolItem.elements';
import useHttp from '../../Hooks/useHttp';
import { useModal } from '../../Context/ModalContext';
import useLocalStorage from '../../Hooks/useLocalStorage';
import Loading from '../Shared/Loading';


const ApplyToCommute = ({ticketId}) => {
    const modal = useModal();
    const [doRequest, loading] = useHttp();
    const [getLocalStorageItem] = useLocalStorage();
    const noteRef = useRef('');

    const doApply = async () => {
        const userData = getLocalStorageItem("userData");
        const note = noteRef.current.value;
        const ticket = await doRequest(process.env.REACT_APP_REGISTER_TO_CARPOOLTICKET_BY_CARPOOLTICKETID+ticketId, 'POST', JSON.stringify({passengerId: userData.userID, passengerNote: note}), userData.token);
        if(ticket.data.length > 0)
        {
            modal.setNotification("Complete", "You have successfully registered to this CoMute");
        }
    }

  return (
    <PageContainer>
    <PageHeader>Apply to CoMute</PageHeader>
    <ModalCustomItemContainer> 
        <CommuteItemInfo>Add a note for the owner to see</CommuteItemInfo>
        <CommuteItemInputTextArea ref={noteRef}/>
        <ModalPopUpContentSegment>
            <br/>
            {
                loading ? <Loading /> :
                <CommuteItemButton onClick={async () => {doApply()}}>Apply</CommuteItemButton>
            }
            
        </ModalPopUpContentSegment>
    </ModalCustomItemContainer>
    </PageContainer>
  )
}

export default ApplyToCommute