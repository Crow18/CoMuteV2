import React from 'react';
import { useEffect, useState } from 'react';
import {IoPencil, IoBanSharp, IoPeople, IoSaveSharp} from 'react-icons/io5';
import {RegisteredCommuteItem, CommuteItemButton, DefaultText, CommuteItemLabel, CommuteItemInfo} from '../../Styled/CarPoolItem.elements';
import useJSONDateConvert from '../../Hooks/useJSONDateConvert';
import { useModal } from '../../Context/ModalContext';
import useHttp from '../../Hooks/useHttp';
import useLocalStorage from '../../Hooks/useLocalStorage';
import Loading from './Loading';

const RegisteredCarPoolItem = ({data}) => {

  const modal = useModal();
  const [doRequest, loading] = useHttp();
  const [getLocalStorageItem] = useLocalStorage();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [registeredDate, setRegisteredDate] = useState('');
  const [passengerStatus, setPassengerStatus] = useState(data.passengerStatus);

  const [convertToISODate, convertToLocaleDate] = useJSONDateConvert();
  const [convertToISOStartDate, convertToLocaleStartDate] = useJSONDateConvert();
  const [convertToISOEndDate, convertToLocaleEndDate] = useJSONDateConvert();

  useEffect(()=> {
    setStartDate(convertToLocaleStartDate(data.departureTime));
    setEndDate(convertToLocaleEndDate(data.expectedArrivalTime));
    setRegisteredDate(convertToLocaleDate(data.passengerRegisterDate));
  }, []);

  const doCancelRegister = async(id) => {
    const userData = getLocalStorageItem("userData");
    const cancelled = await doRequest(process.env.REACT_APP_CANCEL_REGISTERED_TICKET_BY_CARPOOLTICKETID + id, 'POST', JSON.stringify({passengerID: userData.userID}), userData.token);
    if(cancelled.error.length > 0)
    {
     return modal.setNotification("Error", cancelled.error);
    }
    modal.setNotification("Complete", "You have successfully cancelled this registered CoMute");
    setPassengerStatus("Cancelled");
  }

  return (
    <RegisteredCommuteItem>
        <DefaultText position="left">Registered Date <br/> {registeredDate}</DefaultText>
        {
          loading? <Loading /> :
          <CommuteItemButton alternative right onClick={() => {doCancelRegister(data.carPoolTicketID)}}>Cancel <i><IoBanSharp/></i></CommuteItemButton>
        }
        <DefaultText colored position="left" >{data.name} {data.surname}</DefaultText>
        <DefaultText colored position="right" >{passengerStatus}</DefaultText>
        
        <CommuteItemLabel>From</CommuteItemLabel>
        <CommuteItemInfo>{data.origin}</CommuteItemInfo>

        <CommuteItemLabel>To</CommuteItemLabel>
        <CommuteItemInfo >{data.destination}</CommuteItemInfo>

        <CommuteItemLabel>Departure Time</CommuteItemLabel>
        <CommuteItemLabel>Expected Arrival Time</CommuteItemLabel>

        <CommuteItemInfo>{startDate}</CommuteItemInfo>
        <CommuteItemInfo >{endDate}</CommuteItemInfo>

        <CommuteItemLabel>Seats Left</CommuteItemLabel>
        <CommuteItemLabel>Days Left</CommuteItemLabel>

        <CommuteItemInfo>{data.availableSeats}</CommuteItemInfo>
        <CommuteItemInfo>{data.daysAvailable}</CommuteItemInfo>

        <CommuteItemLabel>Creator Note</CommuteItemLabel>
        <CommuteItemInfo>{data.creatorNote}</CommuteItemInfo>
    </RegisteredCommuteItem>
  )
}

export default RegisteredCarPoolItem