import styled from 'styled-components'

export const Loader = styled.span.attrs(props => (
        {
            textMessage: "loading..."
        }
    )
)`
    justify-self: center;
    align-self: center;
    position: relative;
    font-size: 1em;
    color: ${props => props.theme.fontColor};
    z-index: 1;
    font-weight: 550;
    
    &::before{
        content:  ${({ textMessage }) => `"${textMessage}"`};
        background: ${props => props.theme.loaderGlow};
        background-size: 800%;
        position:absolute;
        opacity: 0.9;
        -webkit-text-stroke: 8px transparent;
        /* -webkit-background-clip: text; */
        filter: blur(8px);
        animation: pulse 1.8s linear infinite;
        z-index: -1;
        
    }

    @keyframes pulse{
        0%{
            background-position: left;           
        }
        100%{
            background-position: right;
        }
    }


`;