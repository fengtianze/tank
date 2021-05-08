import React, {
  forwardRef,
  ForwardRefExoticComponent,
  Fragment,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import { Icon } from '../icon';
import { Bem } from '../utils/class-helper';
import containerEl from '../utils/overlay';
import { ConfirmDialog } from './confirm-dialog';
import { ConfirmDialogProps, DialogProps } from './types';

const bem = Bem.of('tk-dialog');

// eslint-disable-next-line react/display-name
export const Dialog = forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  const {
    visible,
    className,
    style,
    mask,
    children,
    content,
    header,
    footer,
    width,
    onClose,
    ...restProps
  } = props;

  const classString = `${bem.b()} ${className}`;

  return visible
    ? createPortal(
        <Fragment>
          {mask && <div className="tk-dialog-mask" />}
          <div className="tk-dialog-overlay">
            <div
              {...restProps}
              ref={ref}
              className={classString}
              style={{ ...style, width }}
            >
              {header && (
                <div className={bem.e('header')}>
                  {header}
                  {onClose && (
                    <Icon
                      className={bem.e('close')}
                      name="tk-icon-close"
                      onClick={onClose}
                    />
                  )}
                </div>
              )}
              <div className={bem.e('content')}>{content || children}</div>
              {footer && <div className={bem.e('footer')}>{footer}</div>}
            </div>
          </div>
        </Fragment>,
        containerEl,
      )
    : null;
}) as ForwardRefExoticComponent<
  PropsWithoutRef<DialogProps> & RefAttributes<HTMLDivElement>
> & { confirm: (props: ConfirmDialogProps) => () => void };

Dialog.defaultProps = { visible: false, className: '', mask: true };

Dialog.displayName = 'TkDialog';

Dialog.confirm = (props) => {
  const rootEl = document.createElement('div');
  containerEl.appendChild(rootEl);

  const destory = () => {
    ReactDOM.unmountComponentAtNode(rootEl);
    containerEl.removeChild(rootEl);
  };

  const config: ConfirmDialogProps = {
    ...props,
    onCancel: () => {
      destory();
      if (props.onCancel) {
        props.onCancel();
      }
    },
    onConfirm: () => {
      destory();
      if (props.onConfirm) {
        props.onConfirm();
      }
    },
  };

  ReactDOM.render(<ConfirmDialog {...config} />, rootEl);

  return destory;
};
