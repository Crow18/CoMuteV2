import React, {useEffect, useState} from 'react';
import {PageItemContainer, PageContainer, PageHeader, PageSegment, Page} from '../../Styled/Page.elements';
import { DefaultText } from '../../Styled/CarPoolItem.elements';
import RegisteredPassengerItem from '../Shared/RegisteredPassengerItem';
import { ModalCustomItemContainer } from '../../Styled/Modal.elements';
import useHttp from '../../Hooks/useHttp';
import Loading from '../Shared/Loading';
import useLocalStorage from '../../Hooks/useLocalStorage';

const Passengers = ({cpid}) => {
  const [getLocalStorageItem] = useLocalStorage();
  const [passengers, setPassengers] = useState([]);
  const [dofetchRequest, loading] = useHttp();

  useEffect(() => {
    const userData = getLocalStorageItem("userData");
    const fetchPassengers = async() => {
        let passengerList = await dofetchRequest(process.env.REACT_APP_GET_PASSENGERS_BY_CARPOOLALLOCATIONID+cpid, 'GET', '', userData.token);
        setPassengers(passengerList.data);
    };

    fetchPassengers();
  }, [cpid])
  

  return (
    <PageContainer>
    <PageHeader>Passengers</PageHeader>
    <ModalCustomItemContainer> 
      {
        loading ? <Loading /> :
        passengers.length > 0 ?        
          passengers.map(item => <RegisteredPassengerItem key={item.carPoolTicketAllocationID} data={item} carPoolTicket={cpid}/>)
           :
          <DefaultText>No passengers have been registered yet</DefaultText>
      }
    </ModalCustomItemContainer>
    </PageContainer>
  )
}

export default Passengers