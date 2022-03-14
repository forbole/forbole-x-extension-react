import React, { useState } from 'react'
import chains from '../../../../../misc/chains'
import Button from '../../../../Element/button'
import ButtonArea from '../../../../Element/buttonArea'

type Props = {
  onSubmit: (name: string, chains: Chain[]) => void
}

const ImportWalletStage = ({ onSubmit }: Props) => {
  const [name, setName] = useState('')
  const [selectedCryptos, setSelectedCryptos] = useState([])

  return (
    <div className="p-5 space-y-5">
      <div>
        <p className="text-sm pb-2">Set a moniker for your wallet</p>
        <input
          key="moniker"
          type="moniker"
          placeholder="Wallet Name"
          className="shadow-sm focus:ring-primary-100 focus:border-primary-100 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm pb-2">You don’t have any account, add account here</p>
        {Object.values(chains).map((c, index) => {
          const isSelected = !!selectedCryptos.find((cc) => c.chainId === cc.chainId)
          return (
            <ButtonArea
              type="select"
              index={index}
              length={2}
              selected={isSelected}
              key={c.chainId}
              onClick={() =>
                setSelectedCryptos((chains) =>
                  chains.includes(c)
                    ? chains.filter((chain) => chain.chainId !== c.chainId)
                    : [...chains, c]
                )
              }
            >
              <>
                <div className="flex items-center py-3 px-4 space-x-2 w-full">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-primary rounded-sm bg-transparent mr-2"
                    checked={isSelected}
                  />
                  <img className="h-8" src={c.image} alt={c.symbol} />
                  <p>{c.chainName}</p>
                </div>
                {Object.values(chains).length > 1 && index + 1 < Object.values(chains).length && (
                  <div className="h-px bg-black mx-4 opacity-10" />
                )}
              </>
            </ButtonArea>
          )
        })}
      </div>
      <div className="w-full pt-20">
        <Button
          disabled={selectedCryptos.length < 1 || !name}
          text="Next"
          onClick={() => {
            onSubmit(name, selectedCryptos)
          }}
        />
      </div>
    </div>
  )
}

export default ImportWalletStage
