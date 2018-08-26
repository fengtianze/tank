import * as React from 'react'
import { Icon } from '../icon'
import { assertClass, Bem } from '../utils/class-helper'
import { ButtonAttrType, ButtonProps, ButtonType } from './types'

export class Button extends React.PureComponent<ButtonProps> {
  public static defaultProps: ButtonProps = {
    attrType: ButtonAttrType.Button,
    type: ButtonType.Default,
    className: '',
  }

  private bem = Bem.of('tk-button')

  public render() {
    const {
      type,
      plain,
      round,
      square,
      loading,
      className,
      attrType,
      ...restProps
    } = this.props

    const btnClass = `${this.bem.b(type)} ${assertClass({
      loading,
      plain,
      round,
      square,
    })} ${className}`

    return (
      <button
        {...restProps}
        type={attrType}
        className={btnClass}
        onClick={this.handleClick}
      >
        <span className={this.bem.e('content')}>{this.props.children}</span>
        {loading ? (
          <span className={this.bem.e('spinner')}>
            <Icon name={'tk-icon-spinner'} />
          </span>
        ) : null}
      </button>
    )
  }

  private handleClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    if (this.props.onClick) {
      this.props.onClick(event)
    }
  }
}
