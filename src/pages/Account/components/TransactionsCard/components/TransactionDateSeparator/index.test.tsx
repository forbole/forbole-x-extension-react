import React from 'react';
import { render } from '@testing-library/react';
import TransactionDateSeparator from './index';

describe('components/TransactionDateSeparator', () => {
  it('renders (today)', () => {
    const t = render(<TransactionDateSeparator daysFromPresent={0} />);

    expect(t).toMatchSnapshot();
  });

  it('renders (yesterday)', () => {
    const t = render(<TransactionDateSeparator daysFromPresent={0} />);

    expect(t).toMatchSnapshot();
  });

  it('renders (x days ago)', () => {
    const t = render(
      <>
        <TransactionDateSeparator daysFromPresent={2} />
        <TransactionDateSeparator daysFromPresent={3} />
        <TransactionDateSeparator daysFromPresent={4} />
        <TransactionDateSeparator daysFromPresent={5} />
        <TransactionDateSeparator daysFromPresent={6} />
      </>
    );

    expect(t).toMatchSnapshot();
  });

  it('renders (a week ago)', () => {
    const t = render(<TransactionDateSeparator daysFromPresent={7} />);

    expect(t).toMatchSnapshot();
  });

  it('renders (date in MM dd yyyy format)', () => {
    jest.useFakeTimers().setSystemTime(new Date('2022-01-01'));
    const t = render(<TransactionDateSeparator daysFromPresent={1000} />);

    expect(t).toMatchSnapshot();

    jest.useRealTimers();
  });
});
