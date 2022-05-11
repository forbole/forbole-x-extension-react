import React from 'react'
import { Divider, Paper, TextField } from '@mui/material'
import { useRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'
import SettingsDropdown from './components/SettingsDropdown'
import SettingsSwitch from './components/SettingsSwitch'
import { themeState, useSetTheme } from '../../../../recoil/general'
import SettingsButton from './components/SettingsButton'
import currencies from '../../../../misc/currencies'
import languages from '../../../../config/languages'
import { currencyState, languageState } from '../../../../recoil/settings'
import ChangePasswordDialog from './components/ChangePasswordDialog'

const GeneralTab = () => {
  const { t } = useTranslation('settings')

  const setTheme = useSetTheme()

  const [theme] = useRecoilState(themeState)

  const [currency, setCurrency] = useRecoilState(currencyState)

  const [language, setLanguage] = useRecoilState(languageState)

  // hardcode default to hkd for now
  const [selectedCurrency, setSelectedCurrency] = React.useState(currencies.indexOf(currency))

  const [selectedLanguage, setSelectedLanguage] = React.useState(languages.indexOf(language))

  const [showPwChangeDialog, setShowPwChangeDialog] = React.useState(false)

  return (
    <>
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
          onChange={(_val) => {
            setSelectedCurrency(_val)
            setCurrency(currencies[_val])
          }}
        />
        <Divider />
        <SettingsDropdown
          label={t('general.language.label')}
          selectedIndex={selectedLanguage}
          values={languages}
          onChange={(_val) => {
            setSelectedLanguage(_val)
            setLanguage(languages[_val])
          }}
        />
        <Divider />
        <SettingsButton
          label={t('general.passwordLock.label')}
          buttonLabel={t('general.passwordLock.changePw')}
          handleClick={() => setShowPwChangeDialog(true)}
        />
      </Paper>
      <ChangePasswordDialog
        isOpen={showPwChangeDialog}
        onClose={() => setShowPwChangeDialog(false)}
      />
      <TextField
        InputProps={{
          disableUnderline: true,
        }}
        fullWidth
        variant="filled"
        rows={10}
      />
    </>
  )
}

export default GeneralTab
