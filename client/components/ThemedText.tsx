import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { TYPOGRAPHY, TypographyStyle } from '@/src/shared/styles/typography';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: TypographyStyle;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'body',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const typographyStyle = TYPOGRAPHY[type];

  return (
    <Text 
      style={[
        typographyStyle,
        { color },
        style,
      ]} 
      {...rest} 
    />
  );
} 