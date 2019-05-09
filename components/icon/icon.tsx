import React from 'react'
import { IconRegistry } from './icon-registry'
import { IconProps } from './types'

IconRegistry.getInstance().registryDefaultIcons()

Icon.defaultProps = {
  name: '',
  className: '',
} as IconProps

export function Icon(props: IconProps) {
  const { className, name, ...restProps } = props

  const classString = `tk-icon ${name} ${className}`

  return (
    <svg {...restProps} className={classString}>
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}
