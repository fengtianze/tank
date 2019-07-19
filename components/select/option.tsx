import React, { forwardRef, useCallback, useContext } from 'react'
import { assertClass, Bem } from '../utils/class-helper'
import { SelectContext } from './select'
import { OptionProps } from './types'

const bem = Bem.of('tk-option')

export const Option = forwardRef<HTMLDivElement, OptionProps>((props, ref) => {
  const { className, children, value, ...restProps } = props
  const { selectedValue, handleOptionSelected } = useContext(SelectContext)

  const classString = `${bem.b()} ${className} ${assertClass({
    selected: selectedValue === value,
  })}`
  const handleClick = useCallback(() => {
    handleOptionSelected(value)
  }, [handleOptionSelected, value])

  return (
    <div {...restProps} ref={ref} className={classString} onClick={handleClick}>
      {children}
    </div>
  )
})

Option.defaultProps = {
  className: '',
}

Option.displayName = 'TkOption'
