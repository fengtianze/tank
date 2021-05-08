import React, {
  forwardRef,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import containerEl from '../utils/overlay';
import { TooltipContent } from './tooltip-content';
import {
  TooltipProps,
  TooltipRef,
  TooltipTheme,
  TooltipTrigger,
} from './types';

export const Tooltip = forwardRef<TooltipRef, TooltipProps>((props, ref) => {
  const { children, content, ...restProps } = props;
  const [triggerEl, setTriggerEl] = useState<HTMLSpanElement>();
  const [tooltipEl, setTooltipEl] = useState<HTMLDivElement>();
  const handleTriggerRefChange = useCallback((el) => {
    setTriggerEl(el);
  }, []);
  const handlePopperRefChange = useCallback((el) => {
    setTooltipEl(el);
  }, []);

  const {
    handleTriggerClick,
    handleTriggerMouseEnter,
    handleTriggerMouseLeave,
    handleTriggerFocus,
    handleTriggerBlur,
    activated,
    patchActivated,
  } = useActivatedControl(props, { triggerEl, tooltipEl });

  useImperativeHandle(
    ref,
    () => {
      return {
        activated,
        active: () => {
          patchActivated(true);
        },
        destroy: () => {
          patchActivated(false);
        },
        switchActivated: () => {
          patchActivated((prev) => !prev);
        },
        triggerEl,
        tooltipEl,
      };
    },
    [activated, patchActivated, triggerEl, tooltipEl],
  );

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
  );
});

Tooltip.defaultProps = {
  trigger: TooltipTrigger.Click,
  theme: TooltipTheme.Default,
  placement: 'top',
  offset: [0, 8],
  arrow: true,
};

Tooltip.displayName = 'TkTooltip';

function useActivatedControl(
  { trigger, onOpen, onClose }: TooltipProps,
  {
    triggerEl,
    tooltipEl,
  }: {
    triggerEl: HTMLSpanElement;
    tooltipEl: HTMLDivElement;
  },
) {
  const [activated, setActivated] = useState<boolean>(false);

  const patchActivated = useCallback(
    (action: SetStateAction<boolean>) => {
      setActivated((prev) => {
        let val: boolean;
        if (action instanceof Function) {
          val = action(prev);
        } else {
          val = action;
        }
        if (val) {
          if (onOpen) {
            onOpen();
          }
        } else {
          if (onClose) {
            onClose();
          }
        }
        return val;
      });
    },
    [onOpen, onClose],
  );

  const handleTriggerClick = useCallback(() => {
    if (trigger === TooltipTrigger.Click) {
      patchActivated((prev) => !prev);
    }
  }, [trigger, patchActivated]);
  const handleTriggerMouseEnter = useCallback(() => {
    if (trigger === TooltipTrigger.Hover) {
      patchActivated(true);
    }
  }, [trigger, patchActivated]);
  const handleTriggerMouseLeave = useCallback(() => {
    if (trigger === TooltipTrigger.Hover) {
      patchActivated(false);
    }
  }, [trigger, patchActivated]);
  const handleTriggerFocus = useCallback(() => {
    if (trigger === TooltipTrigger.Focus) {
      patchActivated(true);
    }
  }, [trigger, patchActivated]);
  const handleTriggerBlur = useCallback(() => {
    if (trigger === TooltipTrigger.Focus) {
      patchActivated(false);
    }
  }, [trigger, patchActivated]);

  useEffect(() => {
    const callback = (event: MouseEvent) => {
      if (
        trigger === TooltipTrigger.Click &&
        triggerEl &&
        tooltipEl &&
        !triggerEl.contains(event.target as HTMLElement) &&
        !tooltipEl.contains(event.target as HTMLElement)
      ) {
        patchActivated(false);
      }
    };
    document.addEventListener('click', callback);
    return () => document.removeEventListener('click', callback);
  }, [trigger, triggerEl, tooltipEl, patchActivated]);

  return {
    handleTriggerClick,
    handleTriggerMouseEnter,
    handleTriggerMouseLeave,
    handleTriggerFocus,
    handleTriggerBlur,
    activated,
    patchActivated,
  };
}
