import * as React from 'react'
import './button.scss'

export class Button extends React.PureComponent {
  public render() {
    return <button>{this.props.children}</button>
  }
}
