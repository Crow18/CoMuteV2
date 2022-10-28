import React, { useRef } from 'react';
import useHttp from '../../Hooks/useHttp';
import { CommuteItemInputTextArea, CommuteItemButton } from '../../Styled/CarPoolItem.elements';
import { ModalCustomItemContainer } from '../../Styled/Modal.elements';
import { PageContainer, PageHeader, PageSegment, PageSegmentContainer } from '../../Styled/Page.elements';
import { BaseButton, BaseInput, BaseLabel } from '../../Styled/Utils/Base.elements';
import AutoCompleteAddress from '../Shared/AutoCompleteAddress';
import DateSelector from '../Shared/DateSelector';
import useLocalStorage from '../../Hooks/useLocalStorage';
import useJSONDateConvert from '../../Hooks/useJSONDateConvert';
import { useModal } from '../../Context/ModalContext';

const CreateCommute = () => {
  const modal = useModal();

  const [getLocalStorageItem, setLocalStorageItem, clearLocalStorage] = useLocalStorage();
  const [doRequest, loading, error] = useHttp();
  const [convertToISOEndDate] = useJSONDateConvert();
  const [convertToISOStartDate] = useJSONDateConvert();

  const date1 = useRef(null);
  const date2 = useRef(null);
  const Origin = useRef('');
  const Destination = useRef('');
  const seatsFree = useRef('');
  const creatorNote = useRef('');


  const doSave = async() =>{
    const userData = getLocalStorageItem("userData");
    const ticketData = ({
      origin: Origin.current.value, 
      destination: Destination.current.value, 
      departureTime: convertToISOStartDate(date1.current.firstChild.value),
      expectedArrivalTime: convertToISOEndDate(date2.current.firstChild.value),
      availableSeats: seatsFree.current.value,
      note: creatorNote.current.value
    });

    const ticket = await doRequest(process.env.REACT_APP_CREATE_CARPOOLTICKET_BY_USERID+userData.userID , 'POST', JSON.stringify(ticketData), userData.token);
    
    ticket.data ?
      modal.setNotification("Complete", "You have successfully created a CoMute") :
      modal.setNotification("Error", ticket.error);
  }

  return (
    <PageContainer>
    <PageHeader>Create new CoMute</PageHeader>
    <ModalCustomItemContainer>
      <PageSegmentContainer>
        <PageSegment>
          <BaseLabel>From</BaseLabel>
          <AutoCompleteAddress Value='' rf={Origin} readOnly={false}/>
        </PageSegment>

        <PageSegment>
          <BaseLabel>To</BaseLabel>
          <AutoCompleteAddress Value='' rf={Destination} readOnly={false}/>
        </PageSegment>

        <PageSegment>
          <BaseLabel>Departure Time</BaseLabel>
          <DateSelector rf={date1} />
        </PageSegment>

        <PageSegment>
          <BaseLabel>Estimated Arrival Time</BaseLabel>
          <DateSelector rf={date2} />
        </PageSegment>

        <PageSegment>
          <BaseLabel>Seats Available</BaseLabel>
          <BaseInput ref={seatsFree}/>
        </PageSegment>

        <PageSegment>
          <BaseLabel>Note</BaseLabel>
          <CommuteItemInputTextArea ref={creatorNote}/>
        </PageSegment>

        <PageSegment>
          <CommuteItemButton onClick={doSave}>Save</CommuteItemButton>
        </PageSegment>
      </PageSegmentContainer>
    </ModalCustomItemContainer>
    </PageContainer>
  )
}

export default CreateCommute