import React, { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import cryptocurrencies from '../misc/cryptocurrencies';
import RemoveAddressDialog from '../components/AddressBook/RemoveAddressDialog';
import EditAddressDialog from '../components/AddressBook/EditAddressDialog';
import AddAddressDialog from '../components/AddressBook/AddAddressDialog';
import Layout from '../components/Layout/layout';
import { FavAddress, favAddressesState } from '../recoil/favorite';
import { ReactComponent as MoreIcon } from '../assets/images/icons/icon_more.svg';
import { ReactComponent as AddIcon } from '../assets/images/icons/icon_add_wallet.svg';
import { ReactComponent as NoAddressImg } from '../assets/images/no_address.svg';

const AddressBook = () => {
  const [favAddresses] = useRecoilState(favAddressesState);
  const tabList = [{ label: 'All', address: favAddresses }];

  const cryptocurrenciesType = Object.keys(cryptocurrencies);
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = React.useMemo(() => {
    cryptocurrenciesType.forEach((x) => {
      tabList.push({ label: x, address: favAddresses.filter((v) => v.crypto === x) });
    });
    return tabList;
  }, [favAddresses, cryptocurrencies]);

  const [addAddressOpen, setAddAddressOpen] = useState(false);
  const [removeAddressOpen, setRemoveAddressOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);

  const [currentAddress, setCurrentAddress] = useState<FavAddress>({
    address: '',
    crypto: '',
    moniker: '',
  });

  const [anchor, setAnchor] = useState<Element>();

  const onClose = useCallback(() => setAnchor(undefined), [setAnchor]);

  const { t } = useTranslation();

  return (
    <>
      <Layout
        title="Address Book"
        rightElement={
          <AddIcon
            className="w-6 h-6 fill-icon-light dark:fill-icon-dark cursor-pointer"
            onClick={() => {
              setAddAddressOpen(true);
            }}
          />
        }
      >
        {favAddresses.length > 0 ? (
          <Box mx={2}>
            <Tabs
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="inherit"
              sx={{
                '& .MuiTabs-indicator': {
                  maxWidth: 45,
                  transform: 'translateX(50%)',
                  backgroundColor: 'indicator',
                },
                color: 'text.primary',
                mb: 2,
              }}
              onChange={(e, v) => setCurrentTab(v)}
            >
              {tabs.map((tab) => (
                <Tab key={tab.label} label={`${tab.label}`} />
              ))}
            </Tabs>

            <Paper>
              {tabs[currentTab].address.map((a, i) => (
                <React.Fragment key={a.address}>
                  <Box display="flex" alignItems="flex-start" justifyContent="space-between" px={2}>
                    <Box
                      display="flex"
                      onClick={() => {
                        // router.push(`/address-book/${a.address}`)
                      }}
                      flex={1}
                      my={3}
                    >
                      <Box alignSelf="center">
                        <Avatar
                          src={a.img ? a.img : cryptocurrencies[a.crypto]?.image}
                          alt={a.address}
                        />
                      </Box>
                      <Box ml={2} maxWidth="sm">
                        <Typography className="truncate max-w-xs" noWrap>
                          {a.moniker}
                        </Typography>
                        <Box display="flex">
                          <Typography variant="body2">{a.crypto}:</Typography>
                          <Typography variant="body2" color="textSecondary" marginLeft={1}>
                            {a.address}
                          </Typography>
                        </Box>
                        {a.note ? (
                          <Box display="flex">
                            <Typography variant="body2">{t('note')}:</Typography>
                            <Typography variant="body2" color="textSecondary" marginLeft={1}>
                              {a.note}
                            </Typography>
                          </Box>
                        ) : null}
                      </Box>
                    </Box>
                    <MoreIcon
                      className="fill-icon-light dark:fill-icon-dark cursor-pointer w-4 h-4 mt-4"
                      onClick={(e) => {
                        setCurrentAddress(a);
                        setAnchor(e.currentTarget);
                      }}
                    />
                  </Box>
                  {i < tabs[currentTab].address.length - 1 ? <Divider /> : null}
                </React.Fragment>
              ))}
            </Paper>
          </Box>
        ) : (
          <Box
            display="flex"
            height="100%"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <NoAddressImg />
            <Typography gutterBottom py={6}>
              {t('you have not added any address')}
            </Typography>
            <Button
              color="primary"
              variant="contained"
              sx={{ paddingX: 7, paddingY: 0.5 }}
              onClick={() => setAddAddressOpen(true)}
            >
              {t('add address')}
            </Button>
          </Box>
        )}
      </Layout>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        open={!!anchor}
        onClose={onClose}
      >
        <MenuItem
          onClick={() => {
            setEditAddressOpen(true);
            onClose();
          }}
        >
          {t('edit address')}
        </MenuItem>
        <Divider style={{ margin: 1 }} />
        <MenuItem
          onClick={() => {
            setRemoveAddressOpen(true);
            onClose();
          }}
        >
          {t('delete address')}
        </MenuItem>
      </Menu>
      <AddAddressDialog open={addAddressOpen} onClose={() => setAddAddressOpen(false)} />
      <RemoveAddressDialog
        accountAddress={currentAddress.address}
        open={removeAddressOpen}
        onClose={() => setRemoveAddressOpen(false)}
      />
      <EditAddressDialog
        currentAddress={currentAddress}
        open={editAddressOpen}
        onClose={() => setEditAddressOpen(false)}
      />
    </>
  );
};

export default AddressBook;
