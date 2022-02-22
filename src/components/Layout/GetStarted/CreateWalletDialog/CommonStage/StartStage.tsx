import React from "react";
import { ReactComponent as WithMnemonicIconLight } from "../../../../../assets/images/login_light.svg";
import { ReactComponent as WithMnemonicIconDark } from "../../../../../assets/images/login_dark.svg";
import { ReactComponent as WithoutMnemonicIconLight } from "../../../../../assets/images/create_wallet_light.svg";
import { ReactComponent as WithoutMnemonicIconDark } from "../../../../../assets/images/create_wallet_dark.svg";
import ButtonArea from "../../../../Element/buttonArea";
import { Stage, ImportStage, CommonStage } from "../index";

interface Props {
  onImportWalet(): void;
  onCreateWallet(): void;
}

const StartStage = ({ onImportWalet, onCreateWallet }: Props) => {
  return (
    <div>
      <div className="flex w-full space-x-7 justify-center mt-10">
        <ButtonArea onClick={onImportWalet}>
          <div className="px-12 py-24 flex flex-col items-center space-y-10">
            <WithMnemonicIconLight />
            <p className="text-sm">Import Wallet</p>
          </div>
        </ButtonArea>
        <ButtonArea onClick={onCreateWallet}>
          <div className="px-12 py-24 flex flex-col items-center space-y-10">
            <WithoutMnemonicIconLight />
            <p className="text-sm">Create Wallet</p>
          </div>
        </ButtonArea>
      </div>
    </div>
  );
};

export default StartStage;
