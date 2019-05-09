import { configure, addParameters } from '@storybook/react'

addParameters({
  options: {
    panelPosition: 'right',
  },
})

function loadStories() {
  require('../stories/index.ts')
  // You can require as many stories as you need.
}

configure(loadStories, module)
