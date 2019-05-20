import { HTMLProps } from 'react'
import { TKProps } from '../types'

export type ButtonProps = TKProps<
  HTMLProps<HTMLButtonElement>,
  {
    type: 'submit' | 'reset' | 'button'
    theme: ButtonTheme
    plain: boolean
    round: boolean
    square: boolean
    loading: boolean
    disabled: boolean
  }
>

export enum ButtonTheme {
  Default = 'default',
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Info = 'info',
  Text = 'text',
}
