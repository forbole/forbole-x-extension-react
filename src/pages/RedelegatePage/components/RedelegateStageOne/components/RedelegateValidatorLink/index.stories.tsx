import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import RedelegateValidatorLink from './index';

type CompType = typeof RedelegateValidatorLink;

export default {
  title: 'Redelegate/RedelegateValidatorLink',
  component: RedelegateValidatorLink,
} as ComponentMeta<CompType>;

export const Default: ComponentStory<CompType> = () => (
  <>
    <div>dev note: blue underline does not appear in production</div>
    <RedelegateValidatorLink
      avatar="https://lh3.googleusercontent.com/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc=w600"
      name="Shrek"
      blockexplorerURL="https://www.forbole.com/"
    />{' '}
  </>
);
