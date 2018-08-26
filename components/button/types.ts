import { MouseEventHandler } from 'react'

export interface ButtonProps {
  readonly type?: ButtonType
  readonly plain?: boolean
  readonly round?: boolean
  readonly square?: boolean
  readonly loading?: boolean
  readonly disabled?: boolean
  readonly className?: string
  readonly attrType?: ButtonAttrType
  readonly onClick?: MouseEventHandler<HTMLButtonElement>
  readonly children?: any
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
