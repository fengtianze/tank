import Popper from 'popper.js'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Bem } from '../utils/class-helper'
import { TooltipContentProps, TooltipTheme } from './types'

const bem = Bem.of('tk-tooltip')

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  (props, ref) => {
    const {
      className,
      theme,
      children,
      refEl,
      placement,
      offset,
      ...restProps
    } = props
    const [popperEl, setPopperEl] = useState<HTMLDivElement>()
    const handlePopperRefChange = useCallback(el => {
      setPopperEl(el)
    }, [])
    const arrowRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(
      ref,
      () => {
        return popperEl!
      },
      [popperEl],
    )
    useLayoutEffect(() => {
      if (!refEl || !popperEl) {
        return
      }
      const popper = new Popper(refEl, popperEl, {
        placement,
        modifiers: {
          arrow: { element: arrowRef.current! },
          offset: { offset },
        },
      })
      return popper.destroy.bind(popper)
    }, [refEl, popperEl, placement, offset])

    const classString = `${bem.b(theme)} ${className}`

    return theme === TooltipTheme.Empty ? (
      <div {...restProps} ref={handlePopperRefChange}>
        {children}
      </div>
    ) : (
      <div {...restProps} ref={handlePopperRefChange} className={classString}>
        <div className={bem.e('content')}>{children}</div>
        <div ref={arrowRef} className={bem.e('arrow')} />
      </div>
    )
  },
)

TooltipContent.defaultProps = {
  className: '',
}
