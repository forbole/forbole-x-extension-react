import React, { useState } from 'react';
import cryptocurrencies from '../../../../../misc/cryptocurrencies';
import currencies from '../../../../../misc/currencies';
import Button from '../../../../Element/button';
import ButtonArea from '../../../../Element/buttonArea';

type Props = {
  setStage: () => void;
};

const ImportWalletStage = ({setStage}: Props) => {
  const [selectedCryptos, setSelectedCryptos] = useState([]);

  return (
    <div className='p-5 space-y-5'>
      <div>
        <p className='text-sm pb-2'>Moniker</p>
        <input
          key='moniker'
          type='moniker'
          placeholder='Wallet Name'
          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100'
        />
      </div>
      <p className='text-sm pb-2'>
        Select the currencies you would like to import
      </p>
      <div className='flex'>
        {Object.values(cryptocurrencies).map((c) => {
          const isSelected = selectedCryptos.includes(c.name);
          return (
            <ButtonArea>
              <div className='flex items-center py-3 px-6 space-x-2'>
                <img className='h-8' src={c.image} alt={c.name} />
                <p>{c.name}</p>
              </div>
            </ButtonArea>
          );
        })}
      </div>
      <div className='w-full pt-20'>
        <Button text='Import' onClick={() => {setStage()}} />
      </div>
    </div>
  );
};

export default ImportWalletStage;
