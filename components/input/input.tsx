import React, { ChangeEvent, FC } from 'react'
import { Bem } from '../utils/class-helper'
import { InputProps } from './types'

const bem = Bem.of('tk-input')

export const Input: FC<InputProps> = props => {
  const { className, onChange, onValueChange, ...restProps } = props

  const classString = `${bem.b()} ${className}`
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event)
    }
    if (onValueChange) {
      onValueChange(event.target.value)
    }
  }

  return (
    <input {...restProps} className={classString} onChange={handleChange} />
  )
}

Input.defaultProps = {
  className: '',
}
