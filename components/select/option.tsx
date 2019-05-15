import React, { FC, useCallback, useContext } from 'react'
import { Bem } from '../utils/class-helper'
import { SelectContext } from './select'
import { OptionProps } from './types'

const bem = Bem.of('tk-option')

export const Option: FC<OptionProps> = props => {
  const { className, children, value, ...restProps } = props
  const { selectedValue, handleOptionSelected } = useContext(SelectContext)

  const classString = `${bem.b()} ${className}`
  const handleClick = useCallback(() => {
    handleOptionSelected(value)
  }, [handleOptionSelected, value])

  return (
    <div
      {...restProps}
      className={classString}
      onClick={handleClick}
      style={{
        backgroundColor: selectedValue === value ? 'aquamarine' : 'white',
      }}
    >
      {children}
    </div>
  )
}

Option.defaultProps = {
  className: '',
}
