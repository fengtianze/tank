import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Button } from '../../components'

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('button', () => {
    const content = text('content', 'button')
    return <Button onClick={action('button clicked')}>{content}</Button>
  })
