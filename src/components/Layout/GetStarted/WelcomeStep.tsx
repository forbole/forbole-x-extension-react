import React from 'react'
import { ReactComponent as GetStartedLightImage } from '../../../assets/images/get_started_light.svg'
import { ReactComponent as GetStartedDarkImage } from '../../../assets/images/get_started_dark.svg'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { themeState } from '../../../recoil/general'

interface Props {}

const WelcomeStep = (props: Props) => {
  const themeLoadable = useRecoilValueLoadable(themeState)

  return (
    <div className="flex flex-col items-center mb-5">
      {themeLoadable.state === 'hasValue' && themeLoadable.contents === 'dark' ? (
        <GetStartedDarkImage className="w-full max-w-xs" />
      ) : (
        <GetStartedLightImage className="w-full max-w-xs" />
      )}
      <div className="max-w-sm text-center space-y-1 pt-5">
        <p>Ready to manage your crypto assets?</p>
        <p>
          Follow the step-by-step instructions in the next several screens to create your Forbole X
          wallet.
        </p>
        <p>Enjoy and let us know how you like it!</p>

        <p className="pt-8">Let’s get started by setting up your password.</p>
      </div>
    </div>
  )
}

export default WelcomeStep
