import styled, {css} from 'styled-components' 
import {NavLink} from 'react-router-dom'

export const Navibar = styled.nav`
    background-color: ${props => props.theme.backgroundColor};
    height: max(5%, 2%);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width:100%;
`

export const NavibarLink = styled(NavLink)`
    color: ${props => props.theme.navLinkColor};
    text-decoration: none;
    font-size: 1.2em;
    font-weight: 400;
    margin-right: 0.8em;
    cursor: pointer;

    &:hover
    {
        color: ${props => props.theme.navLinkColorHover};
    }

    &.active
    {
        color: ${props => props.theme.navLinkColorActive};
    }
`

export const NaviButton = styled.button`
    border: none;
    border-radius: 15px;
    background-color: ${props => props.theme.buttonColor};
    cursor: pointer;
    padding: .4em;
    margin-right: .6em;
    font-size: 1em;
    font-weight: 900;
    color: ${props => props.theme.buttonTextColor};

    &:hover{
       background-color:  ${props => props.theme.buttonColorHover};
       color: ${props => props.theme.navLinkButtonColorHover};
       font-weight: 700;
    }

    ${props => props.icon && css`
        background-color: transparent;
        color: ${props => props.theme.navLinkColor};

        &:hover
        {
            background-color: transparent;
        }

        i{
            font-size: 1.6em;
            padding: .2em;
            align-items: center;
            justify-content: center;
            &:hover{               
                background-color: rgba(90, 90, 90, .08);
                color: ${props => props.theme.navLinkButtonColorHover};
                border-radius: 15px;
            }
        }

        p{
            font-size: .4em;
            font-weight: 400;
            color: rgba(200, 200, 200, 1)
        }
    `}
   
`