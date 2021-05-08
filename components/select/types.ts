import { HTMLProps } from 'react';
import { TKProps } from '../types';

export type SelectProps = TKProps<
  HTMLProps<HTMLDivElement>,
  {
    value: any;
    onValueChange: (v: any) => void;
  }
>;

export type OptionProps = TKProps<
  HTMLProps<HTMLDivElement>,
  {
    value: any;
  }
>;

export interface SelectContextType {
  selectedValue: any;
  handleOptionSelected: (v: any) => void;
}
