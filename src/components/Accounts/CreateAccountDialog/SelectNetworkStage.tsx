import React, { useState } from 'react'
import chains from '../../../misc/chains'
import Button from '../../Element/button'
import ButtonArea from '../../Element/buttonArea'

type Props = {
  onSubmit: (chains: Chain) => void
}

const SelectNetworkStage = ({ onSubmit }: Props) => {
  const [selectedCrypto, setSelectedCrypto] = useState<Chain>()

  return (
    <div className="p-5 space-y-5">
      <div className="flex flex-col">
        {Object.values(chains).map((c, index) => {
          const isSelected = selectedCrypto && selectedCrypto.chainId === c.chainId
          return (
            <ButtonArea
              type="select"
              index={index}
              length={2}
              selected={isSelected}
              key={c.chainId}
              onClick={() => setSelectedCrypto(c)}
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
          disabled={!selectedCrypto}
          text="Next"
          onClick={() => {
            onSubmit(selectedCrypto)
          }}
        />
      </div>
    </div>
  )
}

export default SelectNetworkStage
