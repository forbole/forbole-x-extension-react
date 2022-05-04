import React from 'react'
import Layout from '../../components/Layout/layout'
import SettingsTabBar from "./SettingsTabBar";

const Setting = () => {
    return (
        <Layout title="Setting">
            <div className="space-y-4">
                <SettingsTabBar/>
            </div>
        </Layout>
    )
}

export default Setting
