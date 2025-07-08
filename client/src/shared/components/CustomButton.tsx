import clsx from 'clsx';
import React, { HTMLProps, memo } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';


export interface CustomButtonProps {
  buttonText: string;
  buttonStyle: HTMLProps<HTMLElement>["className"];
  buttonTextStyle: HTMLProps<HTMLElement>["className"];
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  iconColor?: string;
  iconStyle?: HTMLProps<HTMLElement>["className"];
  iconContainerStyle?: HTMLProps<HTMLElement>["className"];
  iconContainerSize?: number;
  disabledContainerStyle?: HTMLProps<HTMLElement>["className"];
}

//Custom Button Component
export const CustomButton = memo(
  ({
    buttonText,
    buttonStyle,
    buttonTextStyle,
    onPress,
    disabled,
    loading,
    icon,
    iconPosition,
    iconColor,
    iconContainerStyle,
    disabledContainerStyle,
  }: CustomButtonProps) => {
    return (
      <Pressable
        className={clsx(buttonStyle, disabled && disabledContainerStyle)}
        onPress={onPress}
        disabled={disabled}
        role="button"
      >
        {icon && iconPosition === 'left' && (
          <View className={clsx(iconContainerStyle)} role="button">
            {icon}
          </View>
        )}
        <Text className={clsx(buttonTextStyle)} role="button">
          {loading ? (
            <ActivityIndicator size="small" color={iconColor} />
          ) : (
            buttonText
          )}
        </Text>
        {icon && iconPosition === 'right' && (
          <View className={iconContainerStyle} role="button">
            {icon}
          </View>
        )}
      </Pressable>
    );
  },
);

CustomButton.displayName = 'CustomButton';