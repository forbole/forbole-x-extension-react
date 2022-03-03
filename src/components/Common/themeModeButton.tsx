import React from 'react'
import { ReactComponent as DarkModeIcon } from '../../assets/images/icons/icon_dark_mode.svg'
import { ReactComponent as LightModeIcon } from '../../assets/images/icons/icon_light_mode.svg'
// @ts-ignore
import nightwind from 'nightwind/helper'
import { themeState, useSetTheme } from '../../recoil/general'
import { useRecoilState } from 'recoil'

const ThemeModeButton = () => {
  const setTheme = useSetTheme()

  const [theme] = useRecoilState(themeState)

  return (
    <>
      {theme === 'dark' ? (
        <DarkModeIcon
          className="cursor-pointer w-6 fill-icon-light dark:fill-icon-dark"
          onClick={() => {
            setTheme()
          }}
        />
      ) : (
        <LightModeIcon
          className="cursor-pointer w-6 fill-icon-light dark:fill-icon-dark"
          onClick={() => {
            setTheme()
          }}
        />
      )}
    </>
  )
}

export default ThemeModeButton
