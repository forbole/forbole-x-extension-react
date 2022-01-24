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
    <div className='grid grid-cols-4'>
      {times(mnemonicAmount || 24).map((i) => (
        <div key={`mnemonic-${i}`} className='h-12'>
          <div className='relative'>
            {disabled ? (
              <p className='ml-6 pl-2 mr-7 w-16 border rounded-sm py-1 bg-gray-50'>
                {mnemonicArr[i]}{' '}
              </p>
            ) : (
              <input
                className='ml-6 pl-2 mr-7 w-16 border rounded-sm py-1 bg-gray-50'
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
              className='absolute top-0 text-xs left-0 select-none'
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
