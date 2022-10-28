import styled, {css} from 'styled-components';

export const BaseLabel = styled.label`
    
`;

export const BaseInput = styled.input`
    height: .6em;
    padding: .6em;
    border-radius: 5px;
    font-size: .9em;
    border: none;
    background-color: ${props => props.theme.inputColor};
    color: ${props => props.theme.fontColor};

    &:focus{
        outline: none;
        border: 1px solid ${props=> props.theme.defaultTextColored};
    } 
`;

export const BaseScrollBar = css `
::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background: ${props=> props.theme.backgroundColor};
    border-radius: 5px;
    max-height:1px;
}

::-webkit-scrollbar-thumb {
    background: ${props=> props.theme.headerColor}; 
    height: 4px;
    border-radius: 25px;

}
`;

export const BaseButton = styled.button`
    border: none;
    border-radius: 5px;
    cursor: pointer;
    height: 100%;
    min-width: 6em;
    padding: 0 1em;
    font-size: .85em;
    font-weight: 600;
    line-height: .01em;

    ${props => props.left && css`
    justify-self: flex-start;
    `}
    
    ${props => props.right && css`
    justify-self: flex-end;
    `}
    
    i{
        display: inline-flex;
        vertical-align: middle;
        font-size: 1.2em;
    }
`;