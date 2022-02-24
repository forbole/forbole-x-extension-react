import React, { useState } from "react";
import chains from "../../../../../misc/chains";
import Button from "../../../../Element/button";
import ButtonArea from "../../../../Element/buttonArea";

type Props = {
  onSubmit: (name: string, chains: Chain[]) => void;
};

const ImportWalletStage = ({ onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [selectedCryptos, setSelectedCryptos] = useState([]);

  return (
    <div className="p-5 space-y-5">
      <div>
        <p className="text-sm pb-2">Moniker</p>
        <input
          key="moniker"
          type="moniker"
          placeholder="Wallet Name"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <p className="text-sm pb-2">
        Select the currencies you would like to import
      </p>
      <div className="flex">
        {Object.values(chains).map((c) => {
          const isSelected = !!selectedCryptos.find(
            (cc) => c.chainId === cc.chainId
          );
          return (
            <ButtonArea
              type="select"
              selected={isSelected}
              key={c.chainId}
              onClick={() =>
                setSelectedCryptos((chains) =>
                  chains.includes(c.chainId)
                    ? chains.filter((chain) => chain !== c.chainId)
                    : [...chains, c]
                )
              }
            >
              <div className="flex items-center py-3 px-6 space-x-2">
                <img className="h-8" src={c.image} alt={c.symbol} />
                <p>{c.chainName}</p>
              </div>
            </ButtonArea>
          );
        })}
      </div>
      <div className="w-full pt-20">
        <Button
          text="Import"
          onClick={() => {
            onSubmit(name, selectedCryptos);
          }}
        />
      </div>
    </div>
  );
};

export default ImportWalletStage;
