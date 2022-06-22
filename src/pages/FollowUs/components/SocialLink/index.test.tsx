import React from 'react';
import { render } from 'jest/test-utils';
import ForboleIcon from 'components/svg/ForboleIcon';
import SocialLink from './index';

type Props = React.ComponentProps<typeof SocialLink>;

const testProps: Props = {
  URL: 'https://www.forbole.hk',
  Icon: ForboleIcon,
  siteName: 'Forbole',
  label: 'This is a label',
};

describe('component: SocialLink', () => {
  it('renders', () => {
    const t = render(<SocialLink {...testProps} />);

    expect(t).toMatchSnapshot();
  });

  it('links to URL specified in props', () => {
    const { getByText } = render(<SocialLink {...testProps} />);

    expect(getByText(testProps.label).closest('a')).toHaveAttribute('href', testProps.URL);
  });
});
