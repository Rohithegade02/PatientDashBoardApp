import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import React, { HTMLProps } from 'react';
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

export type IconLibrary = 'MaterialIcons' | 'FontAwesome' | 'Ionicons' | 'FontAwesome5' | 'AntDesign' | 'Entypo';
export type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];
export type FontAwesomeName = React.ComponentProps<typeof FontAwesome>['name'];
export type FontAwesome5Name = React.ComponentProps<typeof FontAwesome5>['name'];
export type AntDesignName = React.ComponentProps<typeof AntDesign>['name'];
export type EntypoName = React.ComponentProps<typeof Entypo>['name'];

interface IconProps extends TouchableOpacityProps {
  name: MaterialIconName | FontAwesomeName | FontAwesome5Name | AntDesignName | EntypoName; 
  size?: number;
  color?: string;
  library?: IconLibrary;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  className?: HTMLProps<HTMLElement>["className"];
}

export const Icon = React.memo(({
  name,
  size = 24,
  color = 'black',
  library = 'MaterialIcons',
  style,
  onPress,
  className,
  ...rest
}: IconProps) => {
  const renderIcon = () => {
    switch (library) {
      case 'MaterialIcons':
        return <MaterialIcons name={name} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={name} size={size} color={color} />;
      case 'FontAwesome':
        return <FontAwesome name={name} size={size} color={color} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={name} size={size} color={color} />;
      case 'AntDesign':
        return <AntDesign name={name} size={size} color={color} />;
      case 'Entypo':
        return <Entypo name={name} size={size} color={color} />;
      default:
        return <MaterialIcons name={name} size={size} color={color} />;
    }
  };

  return onPress ? (
    <TouchableOpacity onPress={onPress} className={clsx(className)} style={style} {...rest}>
      {renderIcon()}
    </TouchableOpacity>
  ) : (
    renderIcon()
  );
});


Icon.displayName = 'Icon';