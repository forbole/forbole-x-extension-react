import chains from 'misc/chains';

const getReceiveTxForAddress = (address: string, chain: string) => {
  const baseURL = chains[chain].lcdApiUrl;

  return fetch(`${baseURL}/cosmos/tx/v1beta1/txs?events=transfer.recipient='${address}'`);
};

export default getReceiveTxForAddress;
