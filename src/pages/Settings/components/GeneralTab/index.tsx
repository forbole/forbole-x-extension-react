import React from 'react'
import { Divider, Paper } from '@mui/material'
import { useRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'
import SettingsDropdown from './components/SettingsDropdown'
import SettingsSwitch from './components/SettingsSwitch'
import { themeState, useSetTheme } from '../../../../recoil/general'
import SettingsButton from './components/SettingsButton'

const currencies = ['EUR', 'GBP', 'JPY', 'KRK', 'HKD']

const languages = ['English']

const GeneralTab = () => {
  const { t } = useTranslation('settings')

  const setTheme = useSetTheme()

  const [theme] = useRecoilState(themeState)

  // hardcode default to hkd for now
  const [selectedCurrency, setSelectedCurrency] = React.useState(4)

  const [selectedLanguage, setSelectedLanguage] = React.useState(0)

  const handleChangePassword = React.useCallback(() => {
    // todo: implementation
  }, [])

  return (
    <Paper>
      <SettingsSwitch
        label={t('general.darkMode')}
        handleChange={() => {
          setTheme()
        }}
        isChecked={theme === 'dark'}
      />
      <Divider />
      <SettingsDropdown
        label={t('general.currency.label')}
        selectedIndex={selectedCurrency}
        values={currencies}
        onChange={setSelectedCurrency}
      />
      <Divider />
      <SettingsDropdown
        label={t('general.language.label')}
        selectedIndex={selectedLanguage}
        values={languages}
        onChange={setSelectedLanguage}
      />
      <Divider />
      <SettingsButton
        label={t('general.passwordLock.label')}
        buttonLabel={t('general.passwordLock.changePw')}
        handleClick={handleChangePassword}
      />
    </Paper>
  )
}

export default GeneralTab
