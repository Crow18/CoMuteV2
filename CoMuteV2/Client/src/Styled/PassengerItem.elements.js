import styled from 'styled-components';
import {BaseScrollBar} from  './Utils/Base.elements';

export const PassengerItem = styled.div`
    display: grid;
    gap: 1em;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, .25);
    background-color: ${props => props.theme.itemColor};
    grid-template-rows: 1fr 5fr 2fr;
    justify-self: center;
    align-self: center;
    width: 94%;
    padding: .5em;
    border-radius: 6px;
    max-height: max-content;
    height: 10em;
    place-items: start;
`;

export const PassengerItemSegment = styled.div`
    width: 100%;
    display: grid;
    gap: .5em;
    grid-template-columns: 6fr 1fr;
    justify-content: space-between;
    text-align: start;
`;

export const PassengerScroller = styled.div`
    height: 100%;
    overflow-y: auto;

    ${BaseScrollBar}
`;

export const PassengerItemActionSegment = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: end;
    gap: .1em;
    
    button{
        padding: 1em 0em;
        width: 1em;
    }
`;