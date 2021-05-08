import { createPopper, Modifier } from '@popperjs/core';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Bem } from '../utils/class-helper';
import { TooltipContentProps, TooltipTheme } from './types';

const bem = Bem.of('tk-tooltip');

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  (props, ref) => {
    const {
      className,
      theme,
      children,
      refEl,
      placement,
      offset,
      arrow,
      ...restProps
    } = props;
    const classString = `${bem.b(theme)} ${className}`;
    const [popperEl, setPopperEl] = useState<HTMLDivElement>();
    const handlePopperRefChange = useCallback((el: HTMLDivElement) => {
      setPopperEl(el);
    }, []);
    const arrowRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      ref,
      () => {
        return popperEl;
      },
      [popperEl],
    );
    useLayoutEffect(() => {
      if (!refEl || !popperEl) {
        return;
      }
      const modifiers: Array<Partial<Modifier<any, any>>> = [
        {
          name: 'offset',
          options: { offset },
        },
      ];
      if (arrowRef.current) {
        modifiers.push({
          name: 'arrow',
          options: { element: arrowRef.current },
        });
      }
      const popper = createPopper(refEl, popperEl, {
        placement,
        modifiers,
      });
      return popper.destroy.bind(popper);
    }, [refEl, popperEl, placement, offset]);

    return theme === TooltipTheme.Empty ? (
      <div {...restProps} ref={handlePopperRefChange}>
        {children}
      </div>
    ) : (
      <div {...restProps} ref={handlePopperRefChange} className={classString}>
        <div className={bem.e('content')}>{children}</div>
        {arrow && <div ref={arrowRef} className={bem.e('arrow')} />}
      </div>
    );
  },
);

TooltipContent.defaultProps = {
  className: '',
};

TooltipContent.displayName = 'TkTooltipContent';
