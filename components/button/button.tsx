import * as React from 'react'
import './button.scss'
import { ButtonProps } from './types'

export class Button extends React.PureComponent<ButtonProps> {
  public render() {
    return <button onClick={this.props.onClick}>{this.props.children}</button>
  }
}
