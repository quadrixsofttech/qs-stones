import { extendTheme } from '@chakra-ui/react';
import '@fontsource/inter';

const theme = extendTheme({
  fonts: {
    heading: `'Inter'`,
  },
  fontWeight: {
    400: 400,
    500: 500,
    600: 600,
    700: 700,
  },
});

export default theme;
