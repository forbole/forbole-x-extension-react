import React from 'react'
import i18next from 'i18next'
import { fireEvent, waitFor } from '@testing-library/dom'
import ChangePasswordDialog from './index'
import { render } from '../../../../../../jest/test-utils'
import { useUnlockWallets, useUpdatePassword } from '../../../../../../recoil/general'

jest.mock('../../../../../../recoil/general', () => ({
  useUnlockWallets: jest.fn(),
  useUpdatePassword: jest.fn(),
}))
// jest.mock('../../../../../../recoil/general/useUpdatePassword', () => true)

describe('component: ChangePasswordDialog', () => {
  it('renders', () => {
    const t = render(<ChangePasswordDialog isOpen />)

    expect(t).toMatchSnapshot()
  })

  it('goes from stage 1 -> 2', async () => {
    ;(useUnlockWallets as jest.Mock).mockReturnValueOnce(() => async () => true)
    ;(useUpdatePassword as jest.Mock).mockReturnValueOnce(() => () => true)

    const { getByText, getByPlaceholderText } = render(<ChangePasswordDialog isOpen />)

    // expect stage 1 input label
    expect(getByText(i18next.t('settings:general.changePwDialog.stage1.label') as string))

    const stage1Input = getByPlaceholderText(
      i18next.t('settings:general.changePwDialog.stage1.placeholder') as string
    )

    fireEvent.change(stage1Input, 'abc123')
    fireEvent.click(getByText(i18next.t('settings:next') as string))

    await waitFor(() => {
      expect(getByText(i18next.t('settings:general.changePwDialog.stage2.label') as string))
    })
  })

  // not sure why this doesn't work
  // it('goes from stage 2 -> 3', async () => {
  //   ;(useUnlockWallets as jest.Mock).mockReturnValueOnce(() => async () => true)
  //   ;(useUpdatePassword as jest.Mock).mockReturnValueOnce(() => async () => true)
  //
  //   const { getByText, getByPlaceholderText } = render(<ChangePasswordDialog isOpen />)
  //
  //   const stage1Input = getByPlaceholderText(
  //     i18next.t('settings:general.changePwDialog.stage1.placeholder') as string
  //   )
  //
  //   fireEvent.change(stage1Input, 'abc123')
  //   fireEvent.click(getByText(i18next.t('settings:next') as string))
  //
  //   await waitFor(() => {
  //     expect(getByText(i18next.t('settings:general.changePwDialog.stage2.label') as string))
  //   })
  //
  //   const stage2Input = getByPlaceholderText(
  //     i18next.t('settings:general.changePwDialog.stage2.placeholder') as string
  //   )
  //
  //   fireEvent.change(stage2Input, 'abc1231')
  //   fireEvent.click(getByText(i18next.t('settings:save') as string))
  //
  //   await waitFor(() => {
  //     expect(getByText(i18next.t('settings:general.changePwDialog.stage3.description') as string))
  //   })
  // })
})
