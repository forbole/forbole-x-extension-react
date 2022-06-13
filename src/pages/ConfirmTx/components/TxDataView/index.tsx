import React from 'react';
import ReactJson from 'react-json-view';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { themeState } from '@recoil/general';
import { useTranslation } from 'react-i18next';
import styles from './styles';

type Props = {
  txData: any;

  fee: any;
};

/**
 * A component that renders transaction data and fee in json form
 */
const TxDataView = ({ txData, fee }: Props) => {
  const { t } = useTranslation('confirmtx');
  const MUItheme = useTheme();
  const theme = useRecoilValue(themeState);
  const [showData, setShowData] = React.useState(false);

  return (
    <>
      <Box sx={styles.container}>
        <Button
          onClick={() => {
            setShowData((prev) => !prev);
          }}
        >
          <Typography>{showData ? t('hideData') : t('viewData')}</Typography>
        </Button>
      </Box>
      {showData && (
        <ReactJson
          src={{ ...txData, fee }}
          style={{
            backgroundColor: MUItheme.palette.reactJsonBackground,
            borderRadius: MUItheme.spacing(1),
            padding: MUItheme.spacing(1),
            overflowX: 'auto',
          }}
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
          name={false}
          indentWidth={2}
          theme={theme === 'dark' ? 'google' : 'rjv-default'}
        />
      )}
    </>
  );
};

export default TxDataView;
