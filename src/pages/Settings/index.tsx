import React from 'react'
import Layout from '../../components/Layout/layout'
import SettingsTabBar from './components/SettingsTabBar'

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

  return (
    <Layout title="Setting">
      <div className="space-y-4">
        <SettingsTabBar tabs={tabs} currentTab={currentTab} onChange={setCurrentTab} />
      </div>
    </Layout>
  )
}

export default Setting
