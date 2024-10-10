import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { ThemeContextType, ThemeColors } from './themeTypes'; 
import { COLORS, DARK_COLORS } from '../constants/colors';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }:any) => {
  const colorScheme = Appearance.getColorScheme(); 
  const [theme, setTheme] = useState<any | null>(colorScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => subscription.remove(); 
  }, []);

  const currentColors: ThemeColors =
    theme === 'light' ? DARK_COLORS : COLORS;

  return (
    <ThemeContext.Provider value={{ theme: currentColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
