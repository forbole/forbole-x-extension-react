import { selectorFamily } from 'recoil';
import { fetchProposal } from 'services/fetches/proposals';
import chains from '../misc/chains';

export const proposalQueryState = selectorFamily<any, { chainID: string; proposalID: number }>({
  key: 'proposalQuery',
  get:
    ({ chainID, proposalID }) =>
    async () => {
      if (!chains[chainID] || proposalID === -1) {
        return {};
      }
      const proposal = await fetchProposal(chainID, String(proposalID));
      return proposal;
    },
});
