import { SVGProps } from 'react';
import { TKProps } from '../types';

export type IconProps = TKProps<
  SVGProps<SVGSVGElement>,
  {
    name: string;
  }
>;
