import chains from 'misc/chains';

const getSendTxForAddress = (address: string, chain: string) => {
  const baseURL = chains[chain].lcdApiUrl;

  return fetch(`${baseURL}/cosmos/tx/v1beta1/txs?events=message.sender='${address}'`);
};

export default getSendTxForAddress;
