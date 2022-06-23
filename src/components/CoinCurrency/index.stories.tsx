import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Component from './index';

type CompType = typeof Component;

type PropType = React.ComponentProps<CompType>;

export default {
  title: 'Components/CoinCurrency',
  component: Component,
} as ComponentMeta<CompType>;

const defaultProps: PropType = {
  amount: 100,
  symbol: 'DSM',
  currencyValue: 0.01,
  currency: 'USD',
};

const Template = (args: PropType) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = defaultProps;
