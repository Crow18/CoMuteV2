import React, {useRef} from 'react';
import AutoCompleteAddress from './AutoCompleteAddress';
import { SearchContainer } from '../../Styled/SearchItem.elements';
import { CommuteItemButton } from '../../Styled/CarPoolItem.elements';
import {IoSearchOutline} from 'react-icons/io5';
import useHttp from '../../Hooks/useHttp';
import useLocalStorage from '../../Hooks/useLocalStorage';
import Loading from './Loading';

const SearchAddress = ({actionResult}) => {
  const [doRequest, loading] = useHttp();
  const [getLocalStorageItem] = useLocalStorage();
  const searchText = useRef('');

 const doFetchSearchCommutes = async () => {
  const userData = getLocalStorageItem("userData");
  const results = await doRequest(process.env.REACT_APP_GET_FIND_CARPOOLTCKETS_BY_SEARCH, 'POST', JSON.stringify({search: searchText.current.value}), userData.token);
  if(results)
  {
      actionResult.setData(results.data);
      actionResult.setIsSearched(true);
  }
 }

  return (
    <SearchContainer>
          <AutoCompleteAddress rf={searchText}/>
          {
            loading ? <Loading /> : 
            <CommuteItemButton onClick={async() => {doFetchSearchCommutes()}}>search <i><IoSearchOutline/></i></CommuteItemButton>
          }
    </SearchContainer>
  )
}

export default SearchAddress