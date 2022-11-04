import React, { useState, useEffect } from 'react';
import {Page, PageHeader, PageItemContainer, PageContainer} from '../../Styled/Page.elements';
import {CommuteItemButton, DefaultText} from '../../Styled/CarPoolItem.elements';
import CarPoolItemDetail from '../Shared/CarPoolItemDetail';
import RegisteredCarPoolItem from '../Shared/RegisteredCarPoolItem';
import Loading from '../Shared/Loading';
import useHttp from '../../Hooks/useHttp';
import { useModal } from '../../Context/ModalContext';
import CreateCommute from './CreateCommute';
import useLocalStorage from '../../Hooks/useLocalStorage';
import {IoChevronUpSharp, IoChevronDownSharp} from 'react-icons/io5';

export default function Home() {
  const [showRegistered, setShowRegistered] = useState(true);
  const [doRequest, loading] = useHttp();
  const [doRequestdata, loading2] = useHttp();
  const [createdTickets, setCreatedTickets] = useState([]);
  const [registeredTickets, setRegisteredTickets] = useState([]);
  const [getLocalStorageItem] = useLocalStorage();

  const modal = useModal();

 useEffect(() => {
    fetchHttp();
 }, [])
 
  
 const fetchHttp = async() =>
    {
      const user = getLocalStorageItem("userData");
      const createdTicketsResponse = await doRequest(process.env.REACT_APP_GET_CREATED_TICKETS + user.userID, 'GET', '', user.token);
      const registeredTicketsResponse =  await doRequestdata(process.env.REACT_APP_GET_REGISTERED_TICKETS+ user.userID, 'GET', '', user.token);
      
      !createdTicketsResponse.error.length > 0 &&
      setCreatedTickets(createdTicketsResponse.data);

      !registeredTicketsResponse.error.length > 0 &&
       setRegisteredTickets(registeredTicketsResponse.data);
    }

  const handleShowRegistered = () => {
    setShowRegistered(showRegistered => !showRegistered);
  }

  const handleAddTicket = () => {
    modal.setCustom(()=> <CreateCommute /> );
  };

    return (

    <Page>
      <PageContainer>
        <PageHeader>My Commutes <CommuteItemButton onClick={handleAddTicket}>Add +</CommuteItemButton></PageHeader>
        <PageItemContainer>
          {
            loading ? <Loading /> :
            createdTickets.length > 0 ?
            createdTickets.map(item => <CarPoolItemDetail key={item.carPoolTicketId} data={item}/>)        
            :
            <>
              <DefaultText>There are no CoMutes created yet.</DefaultText>
            </>
          }
        </PageItemContainer>
      </PageContainer>

      
        <PageHeader onClick={handleShowRegistered}>Registered Commutes {!showRegistered? <IoChevronUpSharp/> : <IoChevronDownSharp />}</PageHeader>
        {
          showRegistered &&
          <PageContainer>
          <PageItemContainer>
            {
              loading2 ? <Loading /> :
              registeredTickets.length > 0 ?
                registeredTickets.map(item => <RegisteredCarPoolItem key={item.carPoolTicketAllocationID} data={item}/>)              
              :
              <>
                <DefaultText>There are no CoMutes that you have registered to yet.</DefaultText>
              </>
            }
          </PageItemContainer>
        </PageContainer> 
        } 
    </Page>

  )
}