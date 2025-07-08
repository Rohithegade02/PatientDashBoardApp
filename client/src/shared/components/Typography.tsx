import React from 'react';
import * as RN from 'react-native';
import { TYPOGRAPHY_STYLES, TypographyVariant } from '../styles';

interface TypographyProps extends RN.TextProps {
  className?: string;
  variant?: TypographyVariant;
  children: React.ReactNode;
}

export const Typography = ({ children, className = '', variant, ...props }: TypographyProps) => {
  const variantClass = variant ? TYPOGRAPHY_STYLES[variant] : '';
  const combinedClassName = `${variantClass} ${className}`.trim();
  
  return (
    <RN.Text className={combinedClassName} {...props}>
      {children}
    </RN.Text>
  );
};

// Specific typography components
export const Heading1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="heading1" {...props} />
);

export const Heading2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="heading2" {...props} />
);

export const Heading3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="heading3" {...props} />
);

export const Heading4 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="heading4" {...props} />
);

export const Heading5 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="heading5" {...props} />
);

export const Heading6 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="heading6" {...props} />
);

export const Body = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body" {...props} />
);

export const BodyBold = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="bodyBold" {...props} />
);

export const BodyLarge = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="bodyLarge" {...props} />
);

export const BodySmall = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="bodySmall" {...props} />
);

export const Caption = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="caption" {...props} />
);

export const CaptionBold = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="captionBold" {...props} />
);

export const Small = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="small" {...props} />
);

export const SmallBold = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="smallBold" {...props} />
);

export const ButtonText = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="buttonText" {...props} />
);

export const ButtonTextLarge = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="buttonTextLarge" {...props} />
);

export const InputLabel = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="inputLabel" {...props} />
);

export const ErrorText = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="errorText" {...props} />
);

// Export Typography as Text alias for convenience
export { Typography as Text };
