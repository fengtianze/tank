import { HTMLProps } from 'react'

export type ButtonProps = HTMLProps<HTMLButtonElement> & {
  type?: ButtonType
  plain?: boolean
  round?: boolean
  square?: boolean
  loading?: boolean
  disabled?: boolean
  attrType?: ButtonAttrType
}

export enum ButtonType {
  Default = 'default',
  Primary = 'primary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Info = 'info',
  Text = 'text',
}

export enum ButtonAttrType {
  Submit = 'submit',
  Button = 'button',
  Reset = 'reset',
}
