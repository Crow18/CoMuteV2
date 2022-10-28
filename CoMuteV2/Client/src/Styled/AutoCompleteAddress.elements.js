import styled from 'styled-components';
import {BaseInput} from './Utils/Base.elements';

export const AutoCompleteAddressContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

export const AutoCompleteInput = styled(BaseInput).attrs(props => ({
    type: "text"
}))
`
    width: 98%;
`;

export const AutoCompleteDataList = styled.div`
    display: flex;
    flex-direction: column; 
    background: ${props => props.theme.backgroundColor};
    justify-content: center;
    text-align: center;
    align-items: center; 
    position: absolute; 
    z-index: 100000;
    border-radius: 5px;
    margin-top: 1.8em;
    `;

export const AutoCompleteOption = styled.option`
    font-size: .8em;
    font-weight: 650;
    width:100%;
    padding: .5em;
    cursor: pointer;
`;

