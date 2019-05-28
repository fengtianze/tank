import React, {
  forwardRef,
  Fragment,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import containerEl from '../utils/overlay'
import { TooltipContent } from './tooltip-content'
import { TooltipProps, TooltipRef, TooltipTheme, TooltipTrigger } from './types'

export const Tooltip = forwardRef<TooltipRef, TooltipProps>((props, ref) => {
  const { children, content, trigger, ...restProps } = props
  const [triggerEl, setTriggerEl] = useState<HTMLSpanElement>()
  const [tooltipEl, setTooltipEl] = useState<HTMLDivElement>()
  const [activated, setActivated] = useState<boolean>(false)
  const handleTriggerRefChange = useCallback(el => {
    setTriggerEl(el)
  }, [])
  const handlePopperRefChange = useCallback(el => {
    setTooltipEl(el)
  }, [])
  const handleTriggerClick = useCallback(() => {
    if (trigger === TooltipTrigger.Click) {
      setActivated(prev => !prev)
    }
  }, [trigger])
  const handleTriggerMouseEnter = useCallback(() => {
    if (trigger === TooltipTrigger.Hover) {
      setActivated(true)
    }
  }, [trigger])
  const handleTriggerMouseLeave = useCallback(() => {
    if (trigger === TooltipTrigger.Hover) {
      setActivated(false)
    }
  }, [trigger])
  const handleTriggerFocus = useCallback(() => {
    if (trigger === TooltipTrigger.Focus) {
      setActivated(true)
    }
  }, [trigger])
  const handleTriggerBlur = useCallback(() => {
    if (trigger === TooltipTrigger.Focus) {
      setActivated(false)
    }
  }, [trigger])
  useImperativeHandle(
    ref,
    () => {
      return {
        activated,
        active: () => {
          setActivated(true)
        },
        destory: () => {
          setActivated(false)
        },
        switchActivated: () => {
          setActivated(prev => !prev)
        },
        triggerEl,
        tooltipEl,
      }
    },
    [activated, triggerEl, tooltipEl],
  )

  return (
    <Fragment>
      <span
        className="tk-tooltip-trigger"
        ref={handleTriggerRefChange}
        onClick={handleTriggerClick}
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
        onFocus={handleTriggerFocus}
        onBlur={handleTriggerBlur}
      >
        {children}
      </span>
      {activated &&
        createPortal(
          <TooltipContent
            {...restProps}
            ref={handlePopperRefChange}
            refEl={triggerEl}
          >
            {content}
          </TooltipContent>,
          containerEl,
        )}
    </Fragment>
  )
})

Tooltip.defaultProps = {
  trigger: TooltipTrigger.Click,
  theme: TooltipTheme.Default,
  placement: 'top',
  offset: '0,8',
}
