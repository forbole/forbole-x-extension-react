import React from 'react'
import { Divider } from '@mui/material'
import SettingsDropdown from '../SettingsDropdown'

const currencies = ['EUR', 'GBP', 'JPY', 'KRK', 'HKD']

const languages = ['English']

const GeneralSettings = () => {
  // hardcode default to hkd for now
  const [selectedCurrency, setSelectedCurrency] = React.useState(4)

  const [selectedLanguage, setSelectedLanguage] = React.useState(0)

  return (
    <div>
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
    </div>
  )
}

export default GeneralSettings
