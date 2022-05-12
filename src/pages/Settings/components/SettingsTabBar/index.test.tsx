import React from 'react'
import { fireEvent } from '@testing-library/dom'
import SettingsTabBar from './index'
import { render } from '../../../../jest/test-utils'

describe('components: SettingsTabBar', () => {
  it('renders', () => {
    const t = render(<SettingsTabBar tabs={[{ label: '1' }]} currentTab={0} onChange={jest.fn} />)

    expect(t).toMatchSnapshot()
  })

  it('calls onChange function with correct index when tab is clicked', () => {
    const TEST_FN = jest.fn()
    const TEST_TABS = [{ label: 'test' }, { label: 'tab' }, { label: '123' }]
    const { getByText } = render(
      <SettingsTabBar tabs={TEST_TABS} currentTab={0} onChange={TEST_FN} />
    )

    fireEvent.click(getByText(TEST_TABS[2].label))

    expect(TEST_FN).toHaveBeenCalledWith(2)
  })
})
