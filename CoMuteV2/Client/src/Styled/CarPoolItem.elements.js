import styled from "styled-components";
import {BaseInput, BaseScrollBar, BaseButton, BaseLabel} from './Utils/Base.elements';

export const MyCommuteItem = styled.div`   
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    gap: .8em;
    padding: .8em;
    border-radius: 6px;
    background-color: ${props => props.theme.itemColor};
    box-shadow: 5px 5px 10px rgba(0, 0, 0, .25);
    width: 24em;
    min-width: min-content;
    height: min-content;
    scroll-snap-align: start;
`;

export const RegisteredCommuteItem = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: .8em;
    padding: .8em;
    border-radius: 6px;
    background-color: ${props => props.theme.itemColor};
    box-shadow: 5px 5px 10px rgba(0, 0, 0, .25);
    width: 24em;
    min-width: min-content;
    height: min-content;
    scroll-snap-align: start;
`;

export const SearchedCommuteItem = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: .8em;
    padding: .8em;
    border-radius: 6px;
    background-color: ${props => props.theme.itemColor};
    box-shadow: 5px 5px 10px rgba(0, 0, 0, .25);
    min-width: min-content;
    height: min-content;
    scroll-snap-align: start;
`;


export const CommuteItemButton = styled(BaseButton)`
    background-color: ${props => props.alternative ? props.theme.buttonColorAlternative : props.theme.buttonColor};   
    color: rgba(0, 0, 0, 1);
    padding: .6em .5em;


    &:hover{
       background-color:  ${props => props.alternative ? props.theme.buttonColorAlternativeHover : props.theme.buttonColorHover};
       color: ${props => props.alternative ? props.theme.buttonTextColorAlternativeHover : props.theme.buttonTextColorHover};
       font-weight: 700;
    }   
`;


export const DefaultText = styled.i`
    text-align: ${props => {
        switch(props.position)
        {
            case 'right':
                return 'end';
       
            case 'left':
                return 'start';

            default:
                return 'center'
        }
        
    }};
    align-self: center;
    color: ${props => props.colored ? props.theme.defaultTextColored : props.theme.defaultText};
    font-weight: ${props => props.colored && "850" };

`;

export const CommuteItemInfo =styled.p`
    font-weight: 600;
    text-align: start;
    justify-self: start;
`;

export const CommuteItemLabel = styled(BaseLabel)`
    text-align: ${props => props.right? "end" : "start"};
    width:  ${props => props.right? "96%" : "100%"};
`;

export const CommuteItemStepInput = styled.input.attrs(props => ({
    type: "number", 
}))
`
    padding: .6em;
    border-radius: 5px;
    border: none;
    background-color: ${props => props.theme.inputColor};
    color: ${props => props.theme.fontColor};
`;

export const CommuteItemInput = styled(BaseInput)`

`;

export const CommuteItemInputTextArea = styled.textarea`

    padding: .6em;
    border-radius: 5px;
    border: none;
    background-color: ${props => props.theme.inputColor};
    color: ${props => props.theme.fontColor};
    resize: none;

    ${BaseScrollBar}

    &:focus{
        outline: none;
        border: 1px solid ${props=> props.theme.defaultTextColored};
    }
`


export const inputStyle = {
    backgroundColor: "black"
};


export const CarPoolItemSegment = styled.div`
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr 1fr;
`;