import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { format, subDays } from 'date-fns';

type Props = {
  daysFromPresent: number;
};

/**
 * A separator component that is used to separate transaction histories by date.
 * Transaction histories are ordered in the steps outlined below.
 */
const TransactionDateSeparator = ({ daysFromPresent }: Props) => {
  const { t } = useTranslation('account');

  /**
   * Time steps that will be rendered:
   * Today
   * Yesterday
   * xx days ago (up to 6)
   * a week ago
   * anything more than 7 days: should show the date in MMM dd yyyy format
   */

  const dateContent = React.useMemo(() => {
    if (daysFromPresent === 0) {
      return t('transactions.rows.today');
    }
    if (daysFromPresent === 1) {
      return t('transactions.rows.yesterday');
    }
    if (daysFromPresent < 7) {
      return t('transactions.rows.xDaysAgo', { days: daysFromPresent });
    }
    if (daysFromPresent === 7) {
      return t('transactions.rows.aWeekAgo');
    }
    return format(subDays(new Date(), daysFromPresent), 'MMM dd yyyy');
  }, [daysFromPresent]);

  return (
    <Typography padding={2} variant="body1" color="text.secondary">
      {dateContent}
    </Typography>
  );
};

export default TransactionDateSeparator;
