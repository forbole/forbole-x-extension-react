import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body6: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body6: React.CSSProperties;
  }

  interface Palette {
    reactJsonBackground: string;

    custom: {
      white: string;

      grey: string;
    };
  }
  interface PaletteOptions {
    reactJsonBackground?: string;

    custom?: {
      white?: string;

      grey?: string;
    };
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body6: true;
  }
}
