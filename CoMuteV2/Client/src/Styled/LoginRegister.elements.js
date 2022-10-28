import styled from 'styled-components';
import { BaseButton, BaseInput, BaseLabel } from './Utils/Base.elements';


export const LoginRegisterPage = styled.div`
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background: linear-gradient(45deg, rgb(50, 168, 82), rgb(56, 50, 168));
`;

export const LoginRegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    background: radial-gradient(rgba(167, 167, 181, .05), rgba(22, 22, 29, .6));
    width: 75%;
    max-width: 30em;
    height: 75%;
    justify-content: center;
    align-items: center;
    place-items: center;
    padding: 1em;
    border-radius: 5px;

    span{
        text-align: center;
        vertical-align: middle;
        font-size: 1000;
        justify-self: center; 
        align-self: center;
        color: white;
    }
`;

export const LoginInputContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    flex-direction: column;
    gap: 1.5em;
`;

export const LoginRegisterHeader = styled.h1`
    font-weight: 600;
    font-size: 4em;
    color: rgba(50, 168, 82, .85);
`;

export const LoginRegisterButton = styled(BaseButton)`
    background-color: rgba(100, 162, 255, 0.65);
    color: white;
    justify-self: center;
    align-self: center;
    height: 2em;
    width: 2em;
`;

export const LoginRegisterLabel = styled(BaseLabel)`
    font-weight: 800;
    font-size: 1.2em;
`;

export const LoginRegisterInput = styled(BaseInput)`
    height: 2em;
`;

export const LoginRegisterInputSegment = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1em;
`;