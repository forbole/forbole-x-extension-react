import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Component from './index';

type CompType = typeof Component;

type PropType = React.ComponentProps<CompType>;

export default {
  title: 'Components/MemoInput',
  component: Component,
} as ComponentMeta<CompType>;

const defaultProps: PropType = {
  setValue: () => {},
  consent: true,
  setConsent: () => {},
};

export const Default: ComponentStory<CompType> = () => <Component {...defaultProps} />;
