import React, { forwardRef } from 'react'
import { IconRegistry } from './icon-registry'
import { IconProps } from './types'

IconRegistry.getInstance().registryDefaultIcons()

export const Icon = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const { className, name, ...restProps } = props

  const classString = `tk-icon ${name} ${className}`

  return (
    <svg {...restProps} ref={ref} className={classString}>
      <use xlinkHref={`#${name}`} />
    </svg>
  )
})

Icon.defaultProps = {
  name: '',
  className: '',
}
