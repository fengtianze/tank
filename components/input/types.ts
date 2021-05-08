import { HTMLProps } from 'react';
import { TKProps } from '../types';

export type InputProps = TKProps<
  HTMLProps<HTMLInputElement>,
  { value: string; onValueChange: (v: string) => void }
>;
