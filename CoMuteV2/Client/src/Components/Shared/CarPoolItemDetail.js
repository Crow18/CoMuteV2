import React, { useState, useRef, useEffect } from 'react';
import {IoPencil, IoClose, IoPeople, IoSaveSharp} from 'react-icons/io5';
import {DefaultText, MyCommuteItem, CommuteItemButton, CommuteItemLabel, CommuteItemInput, CarPoolItemSegment, CommuteItemInputTextArea, CommuteItemStepInput} from '../../Styled/CarPoolItem.elements';
import DateSelector from './DateSelector';
import {useModal} from '../../Context/ModalContext';
import useHttp from '../../Hooks/useHttp';
import AutoCompleteAddress from './AutoCompleteAddress';
import useJSONDateConvert from '../../Hooks/useJSONDateConvert';
import Passengers from '../Pages/Passengers';
import moment from 'moment/moment';
import useLocalStorage from '../../Hooks/useLocalStorage';
import Loading from './Loading';


const CarPoolItemDetail = ({data}) => {
  const modal = useModal();
  
  const [editState, setEditState] = useState(true);
  const [inputData, setInputData] = useState({});
  const [startDate, setStartDate] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [doRequest, loading] = useHttp();
  const [convertToISODate, convertToLocaleDate] = useJSONDateConvert();
  const [convertToISOStartDate, convertToLocaleStartDate] = useJSONDateConvert();
  const [convertToISOEndDate, convertToLocaleEndDate] = useJSONDateConvert();
  const [getLocalStorageItem] = useLocalStorage();

  const date1 = useRef(null);
  const date2 = useRef(null);
  const Origin = useRef(null);
  const Destination = useRef(null);
  const seatsFree = useRef('');
  const creatorNote = useRef('');

  const userData = getLocalStorageItem("userData"); 

  useEffect(() => {
    setCreationDate(convertToLocaleDate(data.createdDate));
    setEndDate(convertToLocaleEndDate(data.expectedArrivalTime));
    setStartDate(convertToLocaleStartDate(data.departureTime));
  }, [data])
  

  const handleEdit = () => {
    setEditState(editState => !editState);
  }

  const handleInputChange = (e) => {
    setInputData({...inputData, [e.target.name]: e.target.value});
  };

  const handlePassengerVisibilty = (id) => {
    modal.setCustom(() => <Passengers cpid={id}/> );
  }

  const handleCancelTicket = (cptId) => {
    modal.setProceedOption(`Cancelling Ticket`, "Are you sure you'd like to cancel this ticket? Every passenger will be declined.", async()=>  {await doCancelTicket(cptId)});
  }

  const doCancelTicket = async(id) => {
    const deleted = await doRequest(process.env.REACT_APP_CANCEL_CREATED_TICKET_BY_CARPOOLTICKETID+id, 'POST', '', userData.token);
    if(deleted.error.length > 0)
    {
      return modal.setNotification("Error", deleted.error);
    }
    modal.setNotification("Cancelled Ticket", "All passengers have been declined");
  }

  const doSave = async () => {
    const ticketData = ({...inputData, 
        origin: Origin.current.value, 
        destination: Destination.current.value, 
        departureTime: convertToISOStartDate(date1.current.firstChild.value),
        expectedArrivalTime: convertToISOEndDate(date2.current.firstChild.value),
        availableSeats: seatsFree.current.value,
        note: creatorNote.current.value
      });
      console.log(ticketData);
    const updated = await doRequest(process.env.REACT_APP_UPDATE_CREATED_TICKET_BY_CARPOOLTICKETID+data.carPoolTicketId, 'PUT', JSON.stringify(ticketData), userData.token);
    if(updated.error.length > 0)
    {
      return modal.setNotification("Error", "Your CoMute has not been saved ");
    }
    modal.setNotification("Ticket updated", "Your CoMute has been saved ");
  }



  return (
    <MyCommuteItem>
        
      <CarPoolItemSegment>
        <DefaultText position="left">Created Date <br/> {creationDate}</DefaultText>
        <DefaultText colored position="right" >{data.status}</DefaultText>
      </CarPoolItemSegment>

      <CommuteItemLabel>From:</CommuteItemLabel>
      <AutoCompleteAddress rf={Origin} readOnly={editState} Value={data.origin}/>

      <CommuteItemLabel>Destination:</CommuteItemLabel>
      <AutoCompleteAddress rf={Destination} readOnly={editState} Value={data.destination}/>

      
      <CarPoolItemSegment>
        <CommuteItemLabel>Start Time</CommuteItemLabel>
        <CommuteItemLabel >Expected Arrival Time</CommuteItemLabel>

        <DateSelector readOnly={editState} dateTime={startDate} rf = {date1}/>
        <DateSelector readOnly={editState} dateTime={endDate} rf ={date2}/>

        <CommuteItemLabel >Seats Available</CommuteItemLabel>
        <CommuteItemLabel >Days Available</CommuteItemLabel>

        <CommuteItemStepInput onChange={handleInputChange} ref={seatsFree} name="seatsAvailble" min="0" step="1" defaultValue={data.availableSeats}/>
        <CommuteItemLabel >{data.daysAvailable}</CommuteItemLabel>
      </CarPoolItemSegment>


      <CommuteItemLabel>Note:</CommuteItemLabel>
      <CommuteItemInputTextArea name="note" ref={creatorNote} onChange={handleInputChange} readOnly={editState} maxLength="800" defaultValue={data.note}/>

    
      { 
        loading ? <Loading /> :
        <CarPoolItemSegment> 
          <CommuteItemButton left onClick={() => handlePassengerVisibilty(data.carPoolTicketId)}>Passengers <i><IoPeople/></i></CommuteItemButton>
          <br/>
          {
            data.daysAvailable >= 0 &&
            <>
              <CommuteItemButton left alternative onClick={() => handleCancelTicket(data.carPoolTicketId)}>Cancel Ticket<i><IoClose/></i></CommuteItemButton>
            
              <CarPoolItemSegment>
                {
                  editState ?
                  <>
                    <br/>
                    <CommuteItemButton right onClick={handleEdit} >Update <i><IoPencil/></i></CommuteItemButton>
                  </> :
                  <>
                    <CommuteItemButton left alternative onClick={handleEdit}>Cancel</CommuteItemButton>
                    <CommuteItemButton onClick={doSave}>Save <i><IoSaveSharp/></i></CommuteItemButton>
                  </>
                } 
              </CarPoolItemSegment>
            </>
          }

        </CarPoolItemSegment>
      }
    </MyCommuteItem>
  )
}

export default CarPoolItemDetail