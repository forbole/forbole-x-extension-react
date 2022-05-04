import React from 'react';
import useStyles from './useStyles';
import {Tabs, Tab} from '@material-ui/core';
import {useTranslation} from "react-i18next";

const tabs = [
    {
        label: 'general'
    },
    {
        label: 'feedback'
    },
    {
        label: 'follow us'
    },
    {
        label: 'about'
    }
]

const SettingsTabBar = () => {

    const {t} = useTranslation();

    const {indicator, customTab} = useStyles()

    const [currentTab, setCurrentTab] = React.useState(0)

    const tabRender = React.useMemo(() => {
        return tabs.map(tab => <Tab className={customTab} key={tab.label} label={tab.label}/>)
    }, [currentTab])


    return (
        <Tabs
            classes={{
                indicator,
            }}
            value={currentTab} onChange={(e, v) => {
            setCurrentTab(v)
        }}>
            {tabRender}
        </Tabs>
    )
};

export default SettingsTabBar;