import React, {useState} from 'react';
import { PageItemContainer } from '../../Styled/Page.elements';
import Loading from './Loading';
import useFetchApi from '../../Hooks/useFetchApi';

const PageLoadItemContainer = ({children, message}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useFetchApi("link", 'type', 'body', 'token', {setLoading, setData, setError}); 

  return (
    <PageItemContainer>
        {
            loading ? 
            <Loading /> :
                data ? 
                children : 
                message
        }
    </PageItemContainer>
  )
}

export default PageLoadItemContainer