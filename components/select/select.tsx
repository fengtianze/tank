import React, {
  createContext,
  forwardRef,
  Fragment,
  useCallback,
  useState,
} from 'react'
import { Tooltip, TooltipRef, TooltipTheme, TooltipTrigger } from '../tooltip'
import { Bem } from '../utils/class-helper'
import { SelectContextType, SelectProps } from './types'

const bem = Bem.of('tk-select')

export const SelectContext = createContext<SelectContextType>({
  selectedValue: null,
  handleOptionSelected: () => {
    // tslint-disable-next-line
  },
})

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const { className, value, children, onValueChange, ...restProps } = props

  const classString = `${bem.b()} ${className}`
  const [tooltipRef, setTooltipRef] = useState<TooltipRef>()
  const handleOptionSelected = useCallback(
    (v: any) => {
      if (onValueChange) {
        onValueChange(v)
      }
      if (tooltipRef) {
        tooltipRef.destory()
      }
    },
    [onValueChange, tooltipRef],
  )
  const handleTooltipRefChange = useCallback(ins => {
    setTooltipRef(ins)
  }, [])

  return (
    <Fragment>
      <div {...restProps} ref={ref} className={classString}>
        <Tooltip
          ref={handleTooltipRefChange}
          trigger={TooltipTrigger.Click}
          theme={TooltipTheme.Empty}
          placement="bottom-start"
          content={
            <div className={bem.e('options')}>
              <SelectContext.Provider
                value={{ selectedValue: value, handleOptionSelected }}
              >
                {children}
              </SelectContext.Provider>
            </div>
          }
        >
          <input value={value} readOnly={true} />
        </Tooltip>
      </div>
    </Fragment>
  )
})

Select.defaultProps = {
  className: '',
}
