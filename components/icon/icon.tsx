import React, { FC } from 'react'
import { IconRegistry } from './icon-registry'
import { IconProps } from './types'

IconRegistry.getInstance().registryDefaultIcons()

export const Icon: FC<IconProps> = props => {
  const { className, name, ...restProps } = props

  const classString = `tk-icon ${name} ${className}`

  return (
    <svg {...restProps} className={classString}>
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}

Icon.defaultProps = {
  name: '',
  className: '',
}
