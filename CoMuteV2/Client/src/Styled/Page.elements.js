import styled from 'styled-components';
import {BaseScrollBar} from './Utils/Base.elements';

export const  Page = styled.div`
   flex:1;
   display:flex;
   gap: .3em;
   flex-direction: column;
   width:100%;
   min-height: 90%;
   flex-wrap: wrap;
   position:relative;
`;

export const PageHeader = styled.h1`
    display: flex;
    justify-content: space-between;
    font-size: 1.4em;
    color: ${props => props.theme.headerColor};
    margin-left: .2em;
    padding: .2em;

    button{
        height: 1em;
        border-radius: 25px;
    }
`;

export const PageContainer = styled.section`
    flex:1;
    display:flex;
    gap: 1em;
    width:100%;
    flex-direction: column;
    flex-wrap: wrap;
    overflow-y: auto;
`;


export const PageItemContainer = styled.div`
    flex:1;
    display: flex;
    flex-wrap: wrap;
    max-width:100%;
    justify-content: center;
    overflow-y: auto;
    border-radius: 5px;
    gap: 1em;
    background-color: ${props => props.theme.containerBackground};
    scroll-snap-type: y proximity;
    ${BaseScrollBar};
`;

export const PageSegmentContainer = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 100%;
`;

export const PageSegment = styled.div`
    flex:1;
    display: grid;
    grid-template-columns: repeat(auto, 1fr);
    min-width: 100%;
    padding: 1em 0;
    max-height: 2.5em;
    gap: .8em;
    justify-content: center;
    align-items: center;
    padding: 2em 0;
`;