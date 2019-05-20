import React, { ChangeEvent, forwardRef } from 'react'
import { Bem } from '../utils/class-helper'
import { InputProps } from './types'

const bem = Bem.of('tk-input')

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
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
    <input
      {...restProps}
      ref={ref}
      className={classString}
      onChange={handleChange}
    />
  )
})

Input.defaultProps = {
  className: '',
}
