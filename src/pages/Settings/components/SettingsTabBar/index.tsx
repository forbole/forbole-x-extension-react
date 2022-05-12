import React from 'react'
import { Tabs, Tab } from '@mui/material'

type Props = {
  /**
   * The tabs to be rendered
   */
  tabs: { label: string }[]

  /**
   * The currently selected tab
   */
  currentTab: number

  /**
   * What to do when the user selects a different tab
   * @param _value
   */
  onChange: (_value: number) => void
}

const SettingsTabBar = ({ tabs, currentTab, onChange }: Props) => {
  const tabRender = React.useMemo(() => {
    return tabs.map((tab) => (
      <Tab
        sx={{
          minWidth: 80,
        }}
        key={tab.label}
        label={tab.label}
      />
    ))
  }, [currentTab])

  return (
    <Tabs
      sx={{
        indicator: {
          color: 'white',
          width: '8px',
        },
      }}
      value={currentTab}
      onChange={(e, v) => {
        onChange(v)
      }}
    >
      {tabRender}
    </Tabs>
  )
}

export default SettingsTabBar
