import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Button } from '../../components'

storiesOf('Button', module)
  .add('default', () => (
    <Button>Hello Button</Button>
  ))
