import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React, { useCallback, useState } from 'react'
import { Option, Select } from '../../components'

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add('select', () => {
    return <Demo />
  })

const valueChangeLog = action('value change')

function Demo() {
  const [value, setValue] = useState('k8s')
  const handleValueChange = useCallback(val => {
    setValue(val)
    valueChangeLog(val)
  }, [])

  return (
    <div>
      <div>value: {value}</div>
      <Select value={value} onValueChange={handleValueChange}>
        <Option value="k8s">k8s</Option>
        <Option value="mesos">mesos</Option>
        <Option value="swarm">swarm</Option>
      </Select>
    </div>
  )
}
