import React, { MouseEventHandler } from 'react'
import { Icon } from '../icon'
import { assertClass, Bem } from '../utils/class-helper'
import { ButtonAttrType, ButtonProps, ButtonType } from './types'

const bem = Bem.of('tk-button')

Button.defaultProps = {
  attrType: ButtonAttrType.Button,
  type: ButtonType.Default,
  className: '',
} as ButtonProps

export function Button(props: ButtonProps) {
  const {
    type,
    plain,
    round,
    square,
    loading,
    className,
    attrType,
    children,
    onClick,
    ...restProps
  } = props

  const btnClass = `${bem.b(type)} ${assertClass({
    loading,
    plain,
    round,
    square,
  })} ${className}`

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <button
      {...restProps}
      type={attrType}
      className={btnClass}
      onClick={handleClick}
    >
      <span className={bem.e('content')}>{children}</span>
      {loading ? (
        <span className={bem.e('spinner')}>
          <Icon name={'tk-icon-spinner'} />
        </span>
      ) : null}
    </button>
  )
}
