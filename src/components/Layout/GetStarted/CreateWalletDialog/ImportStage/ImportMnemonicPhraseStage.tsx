import React from "react";
import MnemonicPhraseInput from "../../../../CreateWallet/MnemonicPhraseInput";
import Button from "../../../../Element/button";

interface Props {
  onSubmit(mnemonic: string): void;
}

const ImportMnemonicPhraseStage = ({ onSubmit }: Props) => {
  const [mnemonic, setMnemonic] = React.useState("");

  return (
    <div className="p-4 space-y-5">
      <MnemonicPhraseInput mnemonic={mnemonic} onChange={setMnemonic} />
      <Button text="Next" onClick={() => onSubmit(mnemonic)} />
    </div>
  );
};

export default ImportMnemonicPhraseStage;
