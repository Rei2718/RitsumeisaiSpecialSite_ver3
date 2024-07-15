import Cookies from 'js-cookie';

export const setColorPresetCookie = (colors: string[]) => {
  Cookies.set('colorPreset', JSON.stringify(colors), { expires: 365 });
};

export const getColorPresetCookie = (): string[] | null => {
  const colors = Cookies.get('colorPreset');
  return colors ? JSON.parse(colors) : null;
};
