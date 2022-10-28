import styled from 'styled-components';

export const SearchContainer = styled.div`
    background: ${props => props.theme.itemColor};
    border-radius: 6px;
    display: grid;
    padding: .5em;
    grid-template-columns: 4fr .6fr;
    width: 80%;
    vertical-align: middle;
    align-self: center;
    justify-content: center;
    justify-items: center;
    gap: 1em;
`;

