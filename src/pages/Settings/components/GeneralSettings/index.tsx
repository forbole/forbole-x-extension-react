import React from 'react'
import { Divider } from '@mui/material'
import { useRecoilState } from 'recoil'
import SettingsDropdown from '../SettingsDropdown'
import SettingsSwitch from '../SettingsSwitch'
import { themeState, useSetTheme } from '../../../../recoil/general'
import SettingsButton from '../SettingsButton'

const currencies = ['EUR', 'GBP', 'JPY', 'KRK', 'HKD']

const languages = ['English']

const GeneralSettings = () => {
  const setTheme = useSetTheme()

  const [theme] = useRecoilState(themeState)

  // hardcode default to hkd for now
  const [selectedCurrency, setSelectedCurrency] = React.useState(4)

  const [selectedLanguage, setSelectedLanguage] = React.useState(0)

  const handleChangePassword = React.useCallback(() => {
    // todo: implementation
  }, [])

  return (
    <div>
      <SettingsSwitch
        label="Dark Mode"
        handleChange={() => {
          setTheme()
        }}
        isChecked={theme === 'dark'}
      />
      <Divider />
      <SettingsDropdown
        label="Currency"
        selectedIndex={selectedCurrency}
        values={currencies}
        onChange={setSelectedCurrency}
      />
      <Divider />
      <SettingsDropdown
        label="Language"
        selectedIndex={selectedLanguage}
        values={languages}
        onChange={setSelectedLanguage}
      />
      <Divider />
      <SettingsButton
        label="Password Lock"
        buttonLabel="Change Password"
        handleClick={handleChangePassword}
      />
    </div>
  )
}

export default GeneralSettings
