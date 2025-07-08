import clsx from 'clsx';
import React, { HTMLProps } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';



export interface CustomHeaderProps {
  leftText?: string;
  rightText?: string;
  leftIcon?: string;
  rightIcon?: string;
  leftPress?: () => void;
  rightPress?: () => void;
  leftTextStyle?:HTMLProps<HTMLElement>["className"];
  rightTextStyle?: HTMLProps<HTMLElement>["className"];
}


export const CustomHeader = ({
  leftText,
  rightText,
  leftIcon,
  rightIcon,
  leftPress,
  rightPress,
  leftTextStyle,
  rightTextStyle,
}: CustomHeaderProps) => {
  return (
    <View className="flex-row justify-between items-center">
      {leftIcon && <>{leftIcon}</>}
      {leftText && (
        <TouchableOpacity onPress={leftPress}>
          <Text className={clsx(leftTextStyle)}>{leftText}</Text>
        </TouchableOpacity>
      )}
      {rightIcon && <>{rightIcon}</>}
      {rightText && (
        <TouchableOpacity onPress={rightPress}>
          <Text className={clsx(rightTextStyle)}>{rightText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;
