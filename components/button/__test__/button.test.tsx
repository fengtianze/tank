import { shallow } from 'enzyme'
import React from 'react'
import { Button } from '../button'

describe('Button', () => {
  it('should render button', () => {
    const wrapper = shallow(<Button>text</Button>)
    expect(wrapper.contains('text')).toBeTruthy()
    expect(wrapper.type()).toBe('button')
  })
})
