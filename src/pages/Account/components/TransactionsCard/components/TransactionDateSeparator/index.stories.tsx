import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import TransactionDateSeparator from './index';

type CompType = typeof TransactionDateSeparator;

export default {
  title: 'Account/TransactionDateSeparator',
  component: TransactionDateSeparator,
} as ComponentMeta<CompType>;

export const Today: ComponentStory<CompType> = () => (
  <TransactionDateSeparator daysFromPresent={0} />
);

export const Yesterday: ComponentStory<CompType> = () => (
  <TransactionDateSeparator daysFromPresent={1} />
);

export const XDaysAgo: ComponentStory<CompType> = () => (
  <>
    <TransactionDateSeparator daysFromPresent={3} />
    <TransactionDateSeparator daysFromPresent={6} />
  </>
);

export const AWeekAgo: ComponentStory<CompType> = () => (
  <TransactionDateSeparator daysFromPresent={7} />
);

export const MoreThanAWeek: ComponentStory<CompType> = () => (
  <TransactionDateSeparator daysFromPresent={1000} />
);
