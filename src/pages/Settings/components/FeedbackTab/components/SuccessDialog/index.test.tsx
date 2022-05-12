import React from 'react'
import { render } from '../../../../../../jest/test-utils'
import SuccessDialog from './index'

describe('component: SuccessDialog', () => {
  it('renders', () => {
    const t = render(<SuccessDialog isOpen onClose={jest.fn} />)

    expect(t).toMatchSnapshot()
  })
})
