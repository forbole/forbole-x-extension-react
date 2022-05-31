import _ from 'lodash';
import chains from 'misc/chains';

const getBlockExplorerURL = ({
  chainID,
  // for future implementation
  /* eslint-disable */
  explorerIdx,
}: {
  chainID: string;
  explorerIdx: number;
}): string => {
  return _.get(chains, `${chainID}.blockExplorerBaseUrl`, '') as string;
};

/**
 * Creates a URL that redirects the user to a specific txhash on a given blockexplorer
 */
const createTxHistoryURL = ({
  chainID,
  txhash,
  explorerIdx = 0,
}: // future feature. blockexplorers will be stored on the chain's config as an array,
// so an index will be necessary to reference it
// explorerIdx = 0,
{
  chainID: string;
  txhash: string;
  explorerIdx?: number;
}) => {
  const blockExplorerURL = getBlockExplorerURL({ chainID, explorerIdx });

  return `${blockExplorerURL}/transactions/${txhash}`;
};

const createValidatorURL = ({
  chainID,
  validatorAddr,
  explorerIdx = 0,
}: {
  chainID: string;
  validatorAddr: string;
  explorerIdx?: number;
}) => {
  const blockExplorerURL = getBlockExplorerURL({ chainID, explorerIdx });

  return `${blockExplorerURL}/validators/${validatorAddr}`;
};

const createAccountURL = ({
  chainID,
  accountAddr,
  explorerIdx = 0,
}: {
  chainID: string;
  accountAddr: string;
  explorerIdx?: number;
}) => {
  const blockExplorerURL = getBlockExplorerURL({ chainID, explorerIdx });

  return `${blockExplorerURL}/accounts/${accountAddr}`;
};

const BlockExplorerUtils = {
  createTxHistoryURL,
  createAccountURL,
  createValidatorURL,
};

export default BlockExplorerUtils;
