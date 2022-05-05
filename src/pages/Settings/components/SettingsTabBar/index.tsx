import React from 'react'
import { Tabs, Tab } from '@mui/material'
import GeneralSettings from '../GeneralSettings'

type Props = {
  // The tabs to be rendered
  tabs: { label: string }[]

  // The current tab
  currentTab: number

  // When the user clicks on a different tab
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

  const tabContent = React.useMemo(
    () => ({
      0: <GeneralSettings />,
    }),
    []
  )

  return (
    <>
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

      {tabContent[currentTab]}
    </>
  )
}

export default SettingsTabBar
