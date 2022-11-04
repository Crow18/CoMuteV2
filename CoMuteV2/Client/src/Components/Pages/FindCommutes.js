import React, {useState, useEffect} from 'react';
import { Page, PageContainer, PageHeader, PageItemContainer } from '../../Styled/Page.elements';
import FindCommuteItem from '../Shared/FindCommuteItem';
import SearchAddress from '../Shared/SearchAddress';
import useHttp from '../../Hooks/useHttp';
import Loading from '../Shared/Loading';
import { DefaultText } from '../../Styled/CarPoolItem.elements';
import useLocalStorage from '../../Hooks/useLocalStorage';
import { useModal } from '../../Context/ModalContext';


const FindCommutes = () => {
  const [doRequest, loading] = useHttp();
  const [getLocalStorageItem] = useLocalStorage();
  const [data, setData] = useState([]);
  const [isSearched, setIsSearched] = useState(false);


  useEffect(() => {
    doFetchTodysAvailableTickets();
  }, [])
  
  const userData = getLocalStorageItem("userData");

  const doFetchTodysAvailableTickets = async() =>{
    const foundTickets = doRequest(process.env.REACT_APP_FETCH_INITIAL_FIND_CARPOOLTICKETS, 'GET', '', userData.token);
    if(foundTickets.data && foundTickets.data.length > 0)
    {
      setData(foundTickets.data)
    }
  };

  return (
    <Page>
      <PageHeader>Find CoMutes</PageHeader>
      <PageContainer>
        <SearchAddress actionResult={{setData, setIsSearched}}/>
        {!isSearched && <PageHeader>Todays CoMutes</PageHeader>}
        <PageItemContainer>
          {
            loading ? <Loading /> :
              data && data.length > 0 ?
                data.map(item => <FindCommuteItem key={item.carPoolTicketID} data={item}/>) :
                <DefaultText>There are no tickets available</DefaultText>
          }
        </PageItemContainer> 
      </PageContainer>
    </Page>
  )
}

export default FindCommutes