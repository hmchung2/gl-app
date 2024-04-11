import {DefaultTheme} from 'styled-components';

export const lightTheme: DefaultTheme = {
  bgColor: 'white',
  fontColor: 'rgb(38, 38, 38)',
  fontWithThemeBackground: '#474747',
  placeHolderFontColor: 'rgba(38, 38, 38, 0.6)',
  activeColor: '#0095F6',
  bgContainerColor: '#3C3C3C',
  borderColor: 'black',
  googleLoginColor: 'blue',
  separatorLineColor: 'rgba(38, 38, 38, 0.2)',
};

export const darkTheme: DefaultTheme = {
  bgColor: '#000',
  fontColor: 'white',
  fontWithThemeBackground: '#778899',
  placeHolderFontColor: 'rgba(255, 255, 255, 0.6)',
  activeColor: '#0095F6',
  bgContainerColor: 'white',
  borderColor: 'white',
  googleLoginColor: 'blue',
  separatorLineColor: 'rgba(255, 255, 255, 0.2)',
};
