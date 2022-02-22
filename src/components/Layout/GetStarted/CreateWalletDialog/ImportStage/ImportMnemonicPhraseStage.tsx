import React from "react";
import MnemonicPhraseInput from "../../../../CreateWallet/MnemonicPhraseInput";
import Button from "../../../../Element/button";

interface Props {
  onSubmit(mnemonic: string): void;
  mnemonic: string;
}

const ImportMnemonicPhraseStage = ({
  onSubmit,
  mnemonic: defaultMnemonic,
}: Props) => {
  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic);

  return (
    <div className="p-4 space-y-5">
      <MnemonicPhraseInput mnemonic={mnemonic} onChange={setMnemonic} />
      <Button text="Next" onClick={() => onSubmit(mnemonic)} />
    </div>
  );
};

export default ImportMnemonicPhraseStage;
