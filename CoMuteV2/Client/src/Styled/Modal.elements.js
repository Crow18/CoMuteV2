import styled from "styled-components";
import { BaseScrollBar } from "./Utils/Base.elements";

export const ModalPopUp = styled.div`
    z-index: 5000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: rgba(0,0,0,.8);
    visibility: ${props => props.Visible? "visible": "hidden"};    
`;

export const ModalPopUpContent = styled.div`
    background-color: ${props => props.theme.modalBackground};
    padding: 2em;
    border-radius: 5px;
    width: 40%;
    min-height: 20em;
    display: grid;
    grid-template-rows: 10% 5fr auto;
`;

export const ModalPopUpContentHeader = styled.h3`
    color: ${props => props.theme.headerColor};
    align-self: flex-start;
`;

export const ModalPopUpContentMessage = styled.p`
    max-width: 100%;
    color: ${props => props.theme.fontColor};
    word-wrap: break-word;
    word-break: break-all;
`;

export const ModalPopUpContentSegment = styled.div`
    background-color: ${props => props.theme.backgroundColor};
    display: flex;
    justify-content: space-between;
    height: 10%;
`;




export const ModalCustomContainer= styled.div`  
    flex:1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width:80%;
    max-width: 38em;
    max-height: 80%;
    justify-content: center;
    overflow-y: auto;
    padding: 1em;
    margin: .5em;
    border-radius: 5px;
    gap: 1em;
    background-color: ${props => props.theme.modalBackground};

    ${BaseScrollBar};
    
`;

export const ModalCustomItemContainer = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    max-width:100%;
    max-height: 95%;
    justify-content: center;
    overflow-y: auto;
    padding: 1em;
    margin: .5em;
    border-radius: 5px;
    margin: 0;
    gap: 1em;
    background-color: ${props => props.theme.containerBackground};

    ${BaseScrollBar};
`;




export const ModalNotification = styled.div`
    z-index: 5000;
    position: fixed;
    height: 3em;
    width: 100%;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.headerColor};
`;