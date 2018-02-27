import Typography from 'typography';

export const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.38,
  headerFontFamily: ['Pacifico', 'Lobster', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Quattrocento Sans', 'Open Sans'],
});

typography.injectStyles();