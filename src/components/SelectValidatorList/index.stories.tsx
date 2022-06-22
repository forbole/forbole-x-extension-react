import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import SelectValidatorList from './index';

type CompType = typeof SelectValidatorList;

type PropType = React.ComponentProps<CompType>;

export default {
  title: 'Components/SelectValidatorList',
  component: SelectValidatorList,
} as ComponentMeta<CompType>;

const DUMMY_VALIDATORS = [
  {
    address: '123123',
    image: 'https://i.imgur.com/aih9snA.png',
    name: 'Shrek',
    commission: 0.1,
    votingPower: 0.1,
    status: 'status',
    jailed: false,
  },
  {
    address: '123123',
    image: 'https://i.imgur.com/aih9snA.png',
    name: 'Shrek',
    commission: 0.1,
    votingPower: 0.1,
    status: 'status',
    jailed: false,
  },
];

const defaultProps: PropType = {
  validators: DUMMY_VALIDATORS,
  onChange: () => {},
};

export const Default: ComponentStory<CompType> = () => <SelectValidatorList {...defaultProps} />;
