import React from 'react'
import Layout from '../../components/Layout/layout'
import SettingsTabBar from './components/SettingsTabBar'
import GeneralSettings from './components/GeneralSettings'

const tabs = [
  {
    label: 'general',
  },
  {
    label: 'feedback',
  },
  {
    label: 'follow us',
  },
  {
    label: 'about',
  },
]

const Setting = () => {
  const [currentTab, setCurrentTab] = React.useState(0)

  const tabContent = React.useMemo(
    () => ({
      0: <GeneralSettings />,
    }),
    []
  )

  return (
    <Layout title="Setting">
      <div className="space-y-4">
        <SettingsTabBar tabs={tabs} currentTab={currentTab} onChange={setCurrentTab} />

        {tabContent[currentTab]}
      </div>
    </Layout>
  )
}

export default Setting
