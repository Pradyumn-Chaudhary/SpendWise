import {
  Bus,
  FileText,
  Film,
  Ghost,
  GlassWater,
  MoreHorizontal,
  ShoppingCart,
  Utensils,
  Wallet,
} from 'lucide-react-native';
import React from 'react';
import { SvgProps } from 'react-native-svg';

// Define the type for our icon components
type IconComponentType = React.FC<SvgProps>;

// Create the map of string names to components
export const ICONS: { [key: string]: IconComponentType } = {
  Food: Utensils,
  Drink: GlassWater,
  Shopping: ShoppingCart,
  Transportation: Bus,
  Entertainment: Film,
  Bills: FileText,
  Income: Wallet,
  Other: MoreHorizontal,
};

export const getIcon = (category: string) => {
  return ICONS[category] || Ghost;
};
