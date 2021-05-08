import { Placement } from '@popperjs/core';
import { HTMLProps, ReactNode } from 'react';
import { TKProps } from '../types';

interface BaseProps {
  theme: TooltipTheme;
  placement: TooltipPlacement;
  offset: [number, number];
  arrow: boolean;
}

export type TooltipProps = TKProps<
  HTMLProps<HTMLDivElement>,
  BaseProps & {
    content: ReactNode;
    trigger: TooltipTrigger;
    onOpen: () => void;
    onClose: () => void;
  }
>;

export type TooltipContentProps = TKProps<
  HTMLProps<HTMLDivElement>,
  BaseProps & { refEl: Element }
>;

export enum TooltipTrigger {
  Hover = 'hover',
  Click = 'click',
  Focus = 'focus',
  Manual = 'manual',
}

export enum TooltipTheme {
  Default = 'default',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Empty = 'empty',
}

export interface TooltipRef {
  activated: boolean;
  active: () => void;
  destroy: () => void;
  switchActivated: () => void;
  triggerEl?: HTMLSpanElement;
  tooltipEl?: HTMLDivElement;
}

export type TooltipPlacement = Placement;
