import React, { FC, Fragment } from 'react'
import ReactDOM, { createPortal } from 'react-dom'
import { Icon } from '../icon'
import { Bem } from '../utils/class-helper'
import { ConfirmDialog } from './confirm-dialog'
import { ConfirmDialogProps, DialogProps } from './types'

const bem = Bem.of('tk-dialog')

const bodyEl = document.querySelector('body') as HTMLBodyElement
const containerEl = document.createElement('div')
containerEl.setAttribute('class', 'tk-dialog-container')
bodyEl.appendChild(containerEl)

export const Dialog: FC<DialogProps> & {
  confirm: (props: ConfirmDialogProps) => () => void
} = props => {
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
  } = props

  const classString = `${bem.b()} ${className}`

  return visible
    ? createPortal(
        <Fragment>
          {mask && <div className="tk-dialog-mask" />}
          <div className="tk-dialog-overlay">
            <div
              {...restProps}
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
    : null
}

Dialog.defaultProps = { visible: false, className: '', mask: true }

Dialog.confirm = props => {
  const rootEl = document.createElement('div')
  containerEl.appendChild(rootEl)

  const destory = () => {
    ReactDOM.unmountComponentAtNode(rootEl)
    containerEl.removeChild(rootEl)
  }

  const config: ConfirmDialogProps = {
    ...props,
    onCancel: () => {
      destory()
      if (props.onCancel) {
        props.onCancel()
      }
    },
    onConfirm: () => {
      destory()
      if (props.onConfirm) {
        props.onConfirm()
      }
    },
  }

  ReactDOM.render(<ConfirmDialog {...config} />, rootEl)

  return destory
}
