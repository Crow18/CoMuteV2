import React, {useState} from 'react'
import { CommuteItemButton, CommuteItemLabel, DefaultText } from '../../Styled/CarPoolItem.elements';
import {PassengerItem, PassengerItemSegment, PassengerItemActionSegment, PassengerScroller} from '../../Styled/PassengerItem.elements';
import useJSONDateConvert from '../../Hooks/useJSONDateConvert';
import useHttp from '../../Hooks/useHttp';
import useLocalStorage from '../../Hooks/useLocalStorage';
import Loading from './Loading';

const RegisteredPassengerItem = ({data, carPoolTicket}) => {
  const [getLocalStorageItem] = useLocalStorage();
  const [status, setStatus] = useState(data.passengerStatus);
  const [convertToISODate, convertToLocaleDate] = useJSONDateConvert();
  const [doRequest, loading] = useHttp();

  const userData = getLocalStorageItem("userData");

  const handleDeclinePassenger = async() => {
    const declined = await doRequest(process.env.REACT_APP_DECLINE_PASSENGER_BY_PASSENGERID+data.passengerID, 'PUT', JSON.stringify({carPoolTicketID: carPoolTicket}), userData.token);
    if(declined.data)
    {
      setStatus("Declined");
    }
  }

  const handleAcceptPassenger = async() => {
    const accepted = await doRequest(process.env.REACT_APP_ACCEPT_PASSENGER_BY_PASSENGERID+data.passengerID, 'PUT', JSON.stringify({carPoolTicketID: carPoolTicket}), userData.token);
    if(accepted.data)
    {
      setStatus("Accepted");
    }
  }

  return (
    <PassengerItem>
       
        <PassengerItemSegment>
            <DefaultText colored position="left">{data.passengerName} {data.passengerSurname}</DefaultText>
            <DefaultText position="right" colored>{status}</DefaultText>
        </PassengerItemSegment>

        <CommuteItemLabel>Note</CommuteItemLabel>
        <PassengerScroller>{data.passengerNote}</PassengerScroller>
           
    
        <PassengerItemSegment>
          <DefaultText position="left">Registered date <br/>{convertToLocaleDate(data.passengerRegisterDate)}</DefaultText>
          {
              loading ? <Loading /> :
              <>
                <PassengerItemActionSegment>
                  <CommuteItemButton alternative onClick={async () => {await handleDeclinePassenger()}}>decline</CommuteItemButton>
                  <CommuteItemButton onClick={async () => {await handleAcceptPassenger()}}>accept</CommuteItemButton>
                </PassengerItemActionSegment>
              </>
          }
        </PassengerItemSegment>
    </PassengerItem>
  )
}

export default RegisteredPassengerItem