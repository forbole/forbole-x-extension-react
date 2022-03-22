import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing'
import React from 'react'
import Button from '../../../Element/button'
import Textarea from '../../../Element/textarea'

interface Props {
  onSubmit(privateKey: string): void
}

const ImportPrivateKeyStage = ({ onSubmit }: Props) => {
  const [privateKey, setPrivateKey] = React.useState('')
  const [error, setError] = React.useState('')

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        setError('')
        try {
          await DirectSecp256k1Wallet.fromKey(Buffer.from(privateKey, 'hex'))
          onSubmit(privateKey)
        } catch (err) {
          console.log(err)
          setError('Invalid private key')
        }
      }}
    >
      <div className="p-4 space-y-5">
        <div className="mb-8">
          <p className="mt-4 mb-1">Private Key</p>
          <Textarea value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} rows={8} />
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
        <Button text="Next" type="submit" />
      </div>
    </form>
  )
}

export default ImportPrivateKeyStage
