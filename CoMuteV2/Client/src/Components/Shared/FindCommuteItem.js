import React, { useState, useEffect } from 'react';
import {SearchedCommuteItem, DefaultText, CommuteItemButton, CommuteItemLabel, CommuteItemInfo} from '../../Styled/CarPoolItem.elements';
import useJSONDateConvert from '../../Hooks/useJSONDateConvert';
import useHttp from '../../Hooks/useHttp';
import { useModal } from '../../Context/ModalContext';
import ApplyToCommute from '../Pages/ApplyToCommute';

const FindCommuteItem = ({data}) => {
  const modal = useModal();

  const [doRequest, loading, error] = useHttp();

  const [convertToIsoDate, convertToLocaleDate] = useJSONDateConvert();
  const [convertToIsoStartDate, convertToStartLocaleDate] = useJSONDateConvert();
  const [convertToIsoEndDate, convertToLocaleEndDate] = useJSONDateConvert();
  
  const [createdDate, setCreatedDate] = useState(data.createdDate);
  const [startDate, setStartDate] = useState(data.departureTime);
  const [endDate, setEndDate] = useState(data.expectedArrivalTime);


  useEffect(() => {
    setCreatedDate(convertToLocaleDate(data.createdDate));
    setStartDate(convertToStartLocaleDate(data.departureTime));
    setEndDate(convertToLocaleEndDate(data.expectedArrivalTime));
  }, [data])

  const doApply = () => {
    modal.setCustom(() => <ApplyToCommute ticketId={data.carPoolTicketID}/>);
  }
  
  return (
    <SearchedCommuteItem>
        <DefaultText position="left" colored>{data.status}</DefaultText>
        <DefaultText colored position="right">{data.ownerName} {data.ownerSurname}</DefaultText>

        <CommuteItemLabel >From</CommuteItemLabel>
        <CommuteItemInfo right>{data.origin}</CommuteItemInfo>

        <CommuteItemLabel >To</CommuteItemLabel>
        <CommuteItemInfo right>{data.destination}</CommuteItemInfo>

        <CommuteItemLabel >Departure Time</CommuteItemLabel>
        <CommuteItemInfo >{startDate}</CommuteItemInfo>

        <CommuteItemLabel >Expected Arrival Time</CommuteItemLabel>
        <CommuteItemInfo >{endDate}</CommuteItemInfo>

        <CommuteItemLabel >Seats Available</CommuteItemLabel>
        <CommuteItemLabel left>Days Available</CommuteItemLabel>

        <CommuteItemInfo >{data.availableSeats}</CommuteItemInfo>
        <CommuteItemInfo >{data.daysAvailable}</CommuteItemInfo>

        <CommuteItemLabel >Creator Note</CommuteItemLabel>
        <CommuteItemInfo right>{data.note}</CommuteItemInfo>

        <DefaultText position="left">Date Created <br/>{createdDate}</DefaultText>
        <CommuteItemButton right onClick={doApply}>Apply</CommuteItemButton>
    </SearchedCommuteItem>
  )
}

export default FindCommuteItem