import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import DelegationInput from './index';

type CompType = typeof DelegationInput;

type PropType = React.ComponentProps<CompType>;

export default {
  title: 'Components/DelegationInput',
  component: DelegationInput,
} as ComponentMeta<CompType>;

const defaultProps: PropType = {
  validator: {
    address: '123123',
    image: 'https://i.imgur.com/aih9snA.png',
    name: 'Shrek',
    commission: 0.1,
    votingPower: 0.1,
    status: 'status',
    jailed: false,
  },
  chainID: 'desmos-mainnet-1',
  delegationAmount: 1000,
  tokenDenom: 'DSM',
  percent: 100,
  handleChange: () => {},
  handleSliderChanged: () => {},
  handlePercentChanged: () => {},
  type: 'delegate',
};

const redelegateProps: PropType = {
  ...defaultProps,
  type: 'redelegate',
};

export const Delegate: ComponentStory<CompType> = () => <DelegationInput {...defaultProps} />;

export const Redelegate: ComponentStory<CompType> = () => <DelegationInput {...redelegateProps} />;
