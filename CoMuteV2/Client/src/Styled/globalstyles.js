import {createGlobalStyle} from 'styled-components';

export const lightMode = {
    backgroundColor: "rgba(225, 225, 255, 1)",
    background: "rgba(255, 255, 255, 1)",
    fontColor: "black",
    headerColor: "rgba(20, 143, 219, .95)",
    modalBackground: "rgba(225, 225, 255, 1)",
    containerBackground: "rgba(225, 225, 255, 0)",
    itemColor: "rgba(255, 255, 255, .8)",

    navLinkColor: "rgba(92, 34, 240, 1)",
    navLinkColorHover: "rgba(140, 16, 102, 1)",
    navLinkColorActive: "rgba(2, 0, 100, 1)",
    navLinkButtonColorHover: "rgba(41, 34, 240, 1)",

    defaultText: "rgba(50, 50, 50, 1)",
    defaultTextColored: "rgba(41, 34, 240, .8)",

    inputColor: "rgba(220, 235, 254, .6)",
    buttonColor: "rgba(100, 162, 255, 0.65)",
    buttonColorHover: "rgba(100, 162, 255, 0.4)",
    buttonTextColorHover: "rgba(41, 34, 240, 1)",

    buttonColorAlternative: "rgba(254, 115, 115, .6)",
    buttonColorAlternativeHover: "rgba(200, 99, 71, .6)",
    buttonTextColorAlternativeHover: "rgba(255, 0, 0, 1)",

    loaderGlow: "linear-gradient(45deg, rgba(13, 107, 252, 1), rgba(12, 187, 245, .8) 20%, rgba(3, 107, 252, 1),rgba(3, 107, 252, 1))",
}

export const darkMode = {
    backgroundColor: "#16161d",
    background: "#16161d",
    fontColor: "white",
    headerColor: "rgba(127, 219, 157, 0.85)",
    modalBackground: "#16161d",
    containerBackground: "rgba(35, 35, 46, .4)",
    itemColor: "rgba(45, 45, 54, .5)",

    navLinkColor: "rgba(127, 219, 157, 0.85)",
    navLinkColorHover: "rgba(127, 219, 180, 1)",
    navLinkColorActive: "rgba(180, 240, 220, 1)",
    navLinkButtonColorHover: "rgba(180, 270, 220, 1)",

    defaultText: "rgba(200, 200, 200, 1)",
    defaultTextColored: "rgba(127, 219, 157, 0.85)",

    inputColor: "rgba(20, 20 ,36, .4)",
    buttonColor: "rgba(127, 219, 157, 0.85)",
    buttonColorHover: "rgba(127, 219, 157, 0.15)",
    buttonTextColorHover: "rgba(180, 270, 220, 1)",

    buttonColorAlternative: "rgba(254, 115, 115, 1)",
    buttonColorAlternativeHover: "rgba(254, 105, 115, 0.3)",
    buttonTextColorAlternativeHover: "rgba(255, 30, 0, 1)",

    loaderGlow: "linear-gradient(45deg, rgba(3, 107, 252, .5), rgba(3, 252, 139, .7) 20%, rgba(3, 107, 252, .5),rgba(3, 107, 252, .5))",
}


const GlobalStyles = createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        font-family: 'Rubik', sans-serif;
    }
    
    html{
        
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        height: 100vh;
        width: 100vw;
        scroll-behavior: smooth;
    }
    
    body{
        background-size: cover;
        background-repeat: no-repeat;
        background: ${props => props.theme.background};
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        background-color: ${props => props.theme.backgroundColor};
        color:  ${props => props.theme.fontColor};
        font-size: 1.05em;
        font-weight: 500;
        height: 100%;
        min-width: 100%;
    }

    #root{

        flex :1;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        height: 100%;
    }

`

export default GlobalStyles