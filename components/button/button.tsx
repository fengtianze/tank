import React, { FC, MouseEvent } from 'react'
import { Icon } from '../icon'
import { assertClass, Bem } from '../utils/class-helper'
import { ButtonAttrType, ButtonProps, ButtonType } from './types'

const bem = Bem.of('tk-button')

export const Button: FC<ButtonProps> = props => {
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

  const classString = `${bem.b(type)} ${assertClass({
    loading,
    plain,
    round,
    square,
  })} ${className}`
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <button
      {...restProps}
      type={attrType}
      className={classString}
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

Button.defaultProps = {
  attrType: ButtonAttrType.Button,
  type: ButtonType.Default,
  className: '',
}
