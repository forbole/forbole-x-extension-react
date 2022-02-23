import times from 'lodash/times';
import React from 'react';

interface MnemonicPhraseInputProps {
  mnemonic?: string;
  onChange?(mnemonic: string): void;
  disabled?: boolean;
  mnemonicAmount?: number;
}

const MnemonicPhraseInput: React.FC<MnemonicPhraseInputProps> = ({
  mnemonic,
  onChange,
  disabled,
  mnemonicAmount,
}) => {
  const mnemonicArr = React.useMemo(() => {
    const arr = mnemonic.split(/\s+/);
    return times(mnemonicAmount || 24).map((i) => arr[i] || '');
  }, [mnemonic, mnemonicAmount]);

  const moveToNextInput = React.useCallback((i: number) => {
    const nextInput = document.getElementById(`mnemonic-${i + 1}`);
    if (nextInput) {
      nextInput.focus();
    } else {
      document.getElementById(`mnemonic-${i}`).blur();
    }
  }, []);
  return (
    <div className='grid grid-cols-4 gap-x-4 w-full'>
      {times(mnemonicAmount || 24).map((i) => (
        <div key={`mnemonic-${i}`} className='h-12'>
          <div className='relative'>
            {disabled ? (
              <p className='ml-6 pl-2 mr-7 w-16 border rounded-sm py-1 bg-popup-100 border-gray-300'>
                {mnemonicArr[i]}
              </p>
            ) : (
              <input
                className='pl-7 w-full h-8 text-xs border rounded-sm py-1 bg-popup-100 border-gray-300 relative'
                id={`mnemonic-${i}`}
                value={mnemonicArr[i]}
                autoComplete='off'
                onChange={
                  onChange
                    ? (e) =>
                        onChange(
                          mnemonicArr
                            .map((m, j) =>
                              j === i
                                ? e.target.value.replace(/^. + [^ ]*$/, '')
                                : m
                            )
                            .join(' ')
                            .replace(/\s+/g, ' ')
                            .trim()
                        )
                    : undefined
                }
                onKeyPress={(e) => {
                  if (e.key === ' ') {
                    moveToNextInput(i);
                  }
                }}
              />
            )}
            <p
              color='textSecondary'
              className='absolute top-1/2 -translate-y-1/2 text-xxs text-gray-500 left-2 select-none'
            >
              {i + 1}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(MnemonicPhraseInput);
