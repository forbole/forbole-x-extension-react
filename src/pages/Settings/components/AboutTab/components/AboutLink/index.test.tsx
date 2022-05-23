import React from 'react'
import { render } from '../../../../../../jest/test-utils'
import AboutLink from './index'

describe('component: AboutLink', () => {
  it('renders', () => {
    const t = render(<AboutLink URL="https://google.ca" label="google" />)

    expect(t).toMatchSnapshot()
  })

  it('renders with correct label', () => {
    const TEST_LABEL = 'i am a label'
    const { getByText } = render(<AboutLink URL="https://google.ca" label={TEST_LABEL} />)

    expect(getByText(TEST_LABEL)).toBeTruthy()
  })

  it('links to URL specified in props', () => {
    const TEST_LABEL = 'i am a label'
    const TEST_LINK = 'https://www.forbole.com'
    const { getByText } = render(<AboutLink URL={TEST_LINK} label={TEST_LABEL} />)

    expect(getByText(TEST_LABEL).closest('a')).toHaveAttribute('href', TEST_LINK)
  })
})
