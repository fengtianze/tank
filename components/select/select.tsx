import React, {
  createContext,
  forwardRef,
  Fragment,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Tooltip, TooltipRef, TooltipTheme, TooltipTrigger } from '../tooltip'
import { Bem } from '../utils/class-helper'
import { SelectContextType, SelectProps } from './types'

const bem = Bem.of('tk-select')

export const SelectContext = createContext<SelectContextType>({
  selectedValue: null,
  handleOptionSelected: () => {
    // eslint-disable-line
  },
})

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const { className, value, children, onValueChange, ...restProps } = props

  const classString = `${bem.b()} ${className}`
  const [tooltipRef, setTooltipRef] = useState<TooltipRef>()
  const [compWidth, setCompWidth] = useState<string>('auto')
  const compRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => {
    return compRef.current
  })

  const handleOptionSelected = useCallback(
    (v: any) => {
      if (onValueChange) {
        onValueChange(v)
      }
      if (tooltipRef) {
        tooltipRef.destroy()
      }
    },
    [onValueChange, tooltipRef],
  )
  const handleTooltipRefChange = useCallback(ins => {
    setTooltipRef(ins)
  }, [])
  const handleTooltipOpen = useCallback(() => {
    setCompWidth(compRef.current.offsetWidth + 'px')
  }, [])

  return (
    <Fragment>
      <div {...restProps} ref={compRef} className={classString}>
        <Tooltip
          ref={handleTooltipRefChange}
          trigger={TooltipTrigger.Click}
          theme={TooltipTheme.Empty}
          placement="bottom-start"
          onOpen={handleTooltipOpen}
          content={
            <div className={bem.e('options')} style={{ width: compWidth }}>
              <SelectContext.Provider
                value={{ selectedValue: value, handleOptionSelected }}
              >
                {children}
              </SelectContext.Provider>
            </div>
          }
        >
          <input className={bem.e('input')} value={value} readOnly={true} />
        </Tooltip>
      </div>
    </Fragment>
  )
})

Select.defaultProps = {
  className: '',
}

Select.displayName="TkSelect"
