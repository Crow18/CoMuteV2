import React from 'react';
import { ThemeContext } from '../Context/ThemeContext';
import { darkMode, lightMode } from '../Styled/globalstyles';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../Styled/globalstyles';

const AppThemeContext = ({children, themeContextValue}) => {    
  return (
    <ThemeProvider theme={themeContextValue.themeMode ?  darkMode : lightMode}>{/*for styled components not the created context provider*/}
    <GlobalStyles />
    <ThemeContext.Provider value={themeContextValue}>
        {children}
    </ThemeContext.Provider>
    </ThemeProvider>
    
  )
}

export default AppThemeContext