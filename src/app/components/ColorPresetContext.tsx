"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getColorPresetCookie, setColorPresetCookie } from '../utils/cookie';

interface ColorPresetContextProps {
  colors: string[];
  setColors: (colors: string[]) => void;
}

const ColorPresetContext = createContext<ColorPresetContextProps | undefined>(undefined);

export const ColorPresetProvider = ({ children }: { children: ReactNode }) => {
  const [colors, setColorsState] = useState<string[]>(['#ffeac2', '#D9EEFC', '#aae1ce', '#CDF4F4']);

  useEffect(() => {
    const savedColors = getColorPresetCookie();
    if (savedColors) {
      setColorsState(savedColors);
    }
  }, []);

  const setColors = (newColors: string[]) => {
    setColorsState(newColors);
    setColorPresetCookie(newColors);
  };

  return (
    <ColorPresetContext.Provider value={{ colors, setColors }}>
      {children}
    </ColorPresetContext.Provider>
  );
};

export const useColorPreset = () => {
  const context = useContext(ColorPresetContext);
  if (!context) {
    throw new Error('useColorPreset must be used within a ColorPresetProvider');
  }
  return context;
};
