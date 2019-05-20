import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import { Option, Select } from '../../components'

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add('select', () => {
    return <Demo />
  })

function Demo() {
  const [value, setValue] = useState('k8s')

  return (
    <div>
      <div>value: {value}</div>
      <Select value={value} onValueChange={setValue}>
        <Option value="k8s">k8s</Option>
        <Option value="mesos">mesos</Option>
        <Option value="swarm">swarm</Option>
      </Select>
    </div>
  )
}
