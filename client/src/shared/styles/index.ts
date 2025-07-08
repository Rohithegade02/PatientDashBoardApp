// Typography styles and utilities
export const TYPOGRAPHY_STYLES = {
  heading1: 'text-3xl font-bold',
  heading2: 'text-2xl font-bold',
  heading3: 'text-xl font-bold',
  heading4: 'text-lg font-semibold',
  heading5: 'text-base font-semibold',
  heading6: 'text-sm font-semibold',
  body: 'text-base',
  bodyBold: 'text-base font-bold',
  bodyLarge: 'text-lg',
  bodySmall: 'text-sm',
  caption: 'text-xs',
  captionBold: 'text-xs font-bold',
  small: 'text-xs',
  smallBold: 'text-xs font-bold',
  buttonText: 'text-base font-medium',
  buttonTextLarge: 'text-lg font-medium',
  inputLabel: 'text-sm font-medium',
  errorText: 'text-sm text-red-600',
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY_STYLES;
