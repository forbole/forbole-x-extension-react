import { LaunchpadLedger } from '@cosmjs/ledger-amino'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import Slider from 'react-slick'
import { ReactComponent as UnlockLedgerIcon } from '../../../../../assets/images/ledger/unlock-ledger.svg'
import { ReactComponent as UnlockLedger2Icon } from '../../../../../assets/images/ledger/unlock-ledger-2.svg'
import { ReactComponent as OpenLedgerAppIcon } from '../../../../../assets/images/ledger/open-ledger-app.svg'
import { useCallback, useEffect } from 'react'

export const closeAllLedgerConnections = async () => {
  const devices = await TransportWebHID.list()
  await Promise.all(devices.map((d) => d.close()))
}

interface Props {
  onConnect?(transport: any): void
  onAppOpen?(transport: any): void
  ledgerApp?: string
  transport?: any
}

let retryTimeout
let pendingTimeout

const ImportLedgerStage = ({ onConnect, onAppOpen, ledgerApp, transport }: Props) => {
  const connectLedger = useCallback(async () => {
    let transport
    try {
      // When ledger timeout
      pendingTimeout = setTimeout(() => {
        closeAllLedgerConnections()
        connectLedger()
      }, 5000)
      transport = await TransportWebHID.create()
      const ledger = new LaunchpadLedger(transport, { ledgerAppName: ledgerApp })
      await ledger.getCosmosAppVersion()
      clearTimeout(pendingTimeout)
      clearTimeout(retryTimeout)
      if (onConnect) {
        onConnect(transport)
      } else if (onAppOpen) {
        onAppOpen(transport)
      }
    } catch (err) {
      console.log(err)
      clearTimeout(pendingTimeout)
      if (err.message === 'The device is already open.') {
        // Ledger is connected previously. Close the previous connections
        closeAllLedgerConnections()
        retryTimeout = setTimeout(connectLedger, 1000)
        // No specific ledger app required
      } else if (!ledgerApp && err.message !== 'Ledger’s screensaver mode is on') {
        clearTimeout(retryTimeout)
        onConnect(transport)
      } else {
        retryTimeout = setTimeout(connectLedger, 1000)
      }
    }
  }, [onConnect, ledgerApp, onAppOpen])

  useEffect(() => {
    connectLedger()
    return () => {
      clearTimeout(retryTimeout)
      clearTimeout(pendingTimeout)
    }
  }, [connectLedger, ledgerApp])

  return (
    <div className="p-4 space-y-5 flex flex-col items-center">
      <p className="text-sm text-gray-700 text-center mb-8">
        {ledgerApp ? (
          'Follow the steps below and sign in your Ledger device.'
        ) : (
          <>
            Turn on and unlock your Ledger device
            <br />
            Make sure the USB cable is being connected
          </>
        )}
      </p>
      <div className="pt-12 w-full px-8">
        {ledgerApp ? (
          <div className="flex justify-center ">
            <OpenLedgerAppIcon />
          </div>
        ) : (
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
        )}
      </div>
      {ledgerApp ? <p className="text-center pt-12">Open {ledgerApp} App</p> : null}
    </div>
  )
}

export default ImportLedgerStage
