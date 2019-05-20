import React, { createContext, FC, Fragment, useCallback } from 'react'
import { Bem } from '../utils/class-helper'
import { SelectContextType, SelectProps } from './types'

const bem = Bem.of('tk-select')

export const SelectContext = createContext<SelectContextType>({
  selectedValue: null,
  handleOptionSelected: () => {
    // tslint-disable-next-line
  },
})

export const Select: FC<SelectProps> = props => {
  const { className, value, children, onValueChange, ...restProps } = props

  const classString = `${bem.b()} ${className}`
  const handleOptionSelected = useCallback(
    (v: any) => {
      if (onValueChange) {
        onValueChange(v)
      }
    },
    [onValueChange],
  )

  return (
    <Fragment>
      <div {...restProps} className={classString}>
        <input value={value} readOnly={true} />
      </div>
      <SelectContext.Provider
        value={{ selectedValue: value, handleOptionSelected }}
      >
        {children}
      </SelectContext.Provider>
    </Fragment>
  )
}

Select.defaultProps = {
  className: '',
}
