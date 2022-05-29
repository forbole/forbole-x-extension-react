import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body6: React.CSSProperties;
    test: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body6: React.CSSProperties;
    test: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body6: true;
  }
}
