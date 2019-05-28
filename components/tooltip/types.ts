import { Placement } from 'popper.js'
import { HTMLProps, ReactNode } from 'react'
import { TKProps } from '../types'

interface BaseProps {
  theme: TooltipTheme
  placement: TooltipPlacement
  offset: number | string
}

export type TooltipProps = TKProps<
  HTMLProps<HTMLDivElement>,
  {
    content: ReactNode
    trigger: TooltipTrigger
  } & BaseProps
>

export type TooltipContentProps = TKProps<
  HTMLProps<HTMLDivElement>,
  { refEl: Element } & BaseProps
>

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
  activated: boolean
  active: () => void
  destory: () => void
  switchActivated: () => void
  triggerEl?: HTMLSpanElement
  tooltipEl?: HTMLDivElement
}

export type TooltipPlacement = Placement
