import { LaunchpadLedger } from '@cosmjs/ledger-amino'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import Slider from 'react-slick'
import { ReactComponent as UnlockLedgerIcon } from '../../../../../assets/images/ledger/unlock-ledger.svg'
import { ReactComponent as UnlockLedger2Icon } from '../../../../../assets/images/ledger/unlock-ledger-2.svg'
import { useCallback, useEffect } from 'react'

const closeAllLedgerConnections = async () => {
  const devices = await TransportWebHID.list()
  await Promise.all(devices.map((d) => d.close()))
}

interface Props {
  onConnect?(transport: any): void
  onAppOpen?(ledger: LaunchpadLedger): void
  ledgerApps?: string[]
  transport?: any
}

let retryTimeout
let pendingTimeout

const ImportLedgerStage = ({ onConnect, onAppOpen, ledgerApps, transport }: Props) => {
  const connectLedger = useCallback(async () => {
    let transport
    try {
      // When ledger timeout
      pendingTimeout = setTimeout(() => {
        closeAllLedgerConnections()
        connectLedger()
      }, 5000)
      transport = await TransportWebHID.create()
      const ledger = new LaunchpadLedger(transport)
      await ledger.getCosmosAppVersion()
      // if (ledgerAppName === 'terra') {
      //   const ledger = new TerraApp(transport)
      //   // Check if ledger app is open
      //   const response = await ledger.getAddressAndPubKey([44, 330, 0, 0, 0], 'terra')
      //   if (!response || !response.bech32_address) {
      //     throw new Error(response.error_message)
      //   }
      // } else {
      //   const ledger = new LaunchpadLedger(transport, { ledgerAppName })
      //   // Check if ledger app is open
      //   await ledger.getCosmosAppVersion()
      // }
      clearTimeout(pendingTimeout)
      clearTimeout(retryTimeout)
      onConnect(transport)
    } catch (err) {
      console.log(err)
      clearTimeout(pendingTimeout)
      if (err.message === 'The device is already open.') {
        // Ledger is connected previously. Close the previous connections
        closeAllLedgerConnections()
        retryTimeout = setTimeout(connectLedger, 1000)
        // No specific ledger app required
      } else if (!ledgerApps && err.message !== 'Ledger’s screensaver mode is on') {
        clearTimeout(retryTimeout)
        onConnect(transport)
      } else {
        retryTimeout = setTimeout(connectLedger, 1000)
      }
    }
  }, [onConnect, ledgerApps])

  useEffect(() => {
    connectLedger()
    return () => {
      clearTimeout(retryTimeout)
      clearTimeout(pendingTimeout)
    }
  }, [connectLedger])

  return (
    <div className="p-4 space-y-5 flex flex-col items-center">
      <p className="text-sm text-gray-700 text-center mb-8">
        Turn on and unlock your Ledger device
        <br />
        Make sure the USB cable is being connected
      </p>
      <div className="pt-12 w-full px-8">
        <Slider infinite autoplay fade autoplaySpeed={2000}>
          <div>
            <div className="flex justify-center ">
              <UnlockLedgerIcon />
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <UnlockLedger2Icon />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default ImportLedgerStage
