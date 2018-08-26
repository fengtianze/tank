import * as React from 'react'
import { IconRegistry } from './icon-registry'
import { IconProps } from './types'

export class Icon extends React.PureComponent<IconProps> {
  public static defaultProps: IconProps = {
    name: '',
    className: '',
  }

  constructor(props: IconProps) {
    super(props)
    IconRegistry.getInstance().registryDefaultIcons()
  }

  public render() {
    const { className, name, ...restProps } = this.props

    const classString = `tk-icon ${name} ${className}`
    return (
      <svg {...restProps} className={classString}>
        <use xlinkHref={`#${name}`} />
      </svg>
    )
  }
}
