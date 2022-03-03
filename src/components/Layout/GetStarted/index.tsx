import OnboardingDialog from './OnboardingDialog'
import WelcomeStep from './WelcomeStep'
import CreateWalletDialog from './CreateWalletDialog'
import { useState } from 'react'
import Button from '../../Element/button'
import { useCreatePassword } from '../../../recoil/general'

interface Props {}

const GetStarted = (props: Props) => {
  const [isOnboardingDialogOpen, setIsOnboardingDialogOpen] = useState(false)
  const [isCreateWalletDialogOpen, setIsCreateWalletDialogOpen] = useState(false)

  const createPassword = useCreatePassword()

  return (
    <div className="">
      <WelcomeStep />
      <div className="flex justify-center">
        <div className="pt-10 max-w-sm w-full">
          <Button
            text="Get Started"
            bgColor="indigo"
            onClick={() => {
              setIsOnboardingDialogOpen(true)
            }}
          />
        </div>
      </div>

      <OnboardingDialog
        open={isOnboardingDialogOpen}
        onClose={() => setIsOnboardingDialogOpen(false)}
        onSubmit={(password) => {
          setIsOnboardingDialogOpen(false)
          setIsCreateWalletDialogOpen(true)
          createPassword(password)
        }}
      />
      <CreateWalletDialog
        open={isCreateWalletDialogOpen}
        onClose={() => setIsCreateWalletDialogOpen(false)}
      />
    </div>
  )
}

export default GetStarted
