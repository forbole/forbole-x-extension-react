import { fetchLcd } from 'services/fetches/index';
import _ from 'lodash';

// proposalID may be referred to as proposalNum in the code
export const fetchProposal = async (chainID: string, proposalID: string) => {
  const response = await fetchLcd(chainID, `/cosmos/gov/v1beta1/proposals/${proposalID}`);

  return _.get(response, 'proposal');
};
