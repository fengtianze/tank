import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import { Input } from '../../components'

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('input', () => {
    const disabled = boolean('disabled', false)
    const readOnly = boolean('readOnly', false)
    const placeholder = text('placeholder', 'placeholder')

    return (
      <Demo disabled={disabled} readOnly={readOnly} placeholder={placeholder} />
    )
  })

function Demo(props: {
  disabled: boolean
  readOnly: boolean
  placeholder: string
}) {
  const [value, setValue] = useState('')

  return (
    <div>
      <div>value: "{value}"</div>
      <Input value={value} onValueChange={setValue} {...props} />
    </div>
  )
}
