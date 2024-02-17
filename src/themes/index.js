import { createTheme } from '@mui/material/styles';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization, mode = 'light') => {
  const color = colors;

  const themeOption = {
    mode,
    colors: color,
    heading: mode === 'dark' ? color.grey50 : color.grey900,
    paper: mode === 'dark' ? color.darkPaper : color.paper,
    backgroundDefault: mode === 'dark' ? color.darkPaper : color.paper,
    background: mode === 'dark' ? color.darkBackground : color.secondaryLight,
    darkTextPrimary: mode === 'dark' ? color.grey50 : color.grey700,
    darkTextSecondary: mode === 'dark' ? color.grey200 : color.grey500,
    textDark: mode === 'dark' ? color.grey50 : color.grey900,
    menuSelected: mode === 'dark' ? color.primaryLight : color.grey50,
    menuSelectedBack: mode === 'dark' ? color.primaryDark : color.primaryMain,
    divider: mode === 'dark' ? color.grey700 : color.grey200,
    customization
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    shape: { borderRadius: 8 },
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography(themeOption)
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
