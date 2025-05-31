// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        lineHeight: '1.6',
      },
    },
  },
  colors: {
    brand: {
      500: 'blue.500', 
      600: 'blue.600', 
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'brand.500',
          _hover: {
            bg: 'brand.600',
          },
        },
      },
    },
  },
});

export default theme;