import { LaunchpadLedger } from '@cosmjs/ledger-amino'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { ReactComponent as OpenLedgerAppIcon } from '../../../../assets/images/ledger/open-ledger-app.svg'
import { useCallback, useEffect } from 'react'

export const closeAllLedgerConnections = async () => {
  const devices = await TransportWebHID.list()
  await Promise.all(devices.map((d) => d.close()))
}

interface Props {
  onAppOpen(transport: any): void
  ledgerApp: string
}

let retryTimeout
let pendingTimeout

const ImportLedgerStage = ({ onAppOpen, ledgerApp }: Props) => {
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
      onAppOpen(transport)
    } catch (err) {
      clearTimeout(pendingTimeout)
      if (err.message === 'The device is already open.') {
        // Ledger is connected previously. Close the previous connections
        closeAllLedgerConnections()
        retryTimeout = setTimeout(connectLedger, 1000)
      } else {
        retryTimeout = setTimeout(connectLedger, 1000)
      }
    }
  }, [ledgerApp, onAppOpen])

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
        Follow the steps below and sign in your Ledger device.
      </p>
      <div className="pt-12 w-full px-8">
        <div className="flex justify-center ">
          <OpenLedgerAppIcon />
        </div>
      </div>
      <p className="text-center pt-12">Open {ledgerApp} App</p>
    </div>
  )
}

export default ImportLedgerStage
