import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Feedback from 'pages/Feedback';
import FollowUs from 'pages/FollowUs';
import About from 'pages/About';
import ConfirmTx from 'pages/ConfirmTx';
import ConfirmTxUnlockWallet from 'pages/ConfirmTxUnlockWallet';
import TxSuccess from 'pages/TxResult/TxSuccess';
import TxReject from 'pages/TxResult/TxReject';
import Account from '../pages/Account';
import AddressBook from '../pages/address-book';
import Setting from '../pages/Settings';
import Wallet from '../pages/wallet';

const routes = [
  { path: '/', key: 'ROOT', exact: true, component: <Wallet /> },
  { path: '/setting', key: 'SETTING', exact: true, component: <Setting /> },
  { path: '/address-book', key: 'ADDRESS-BOOK', exact: true, component: <AddressBook /> },
  { path: '/account/:address', key: 'ACCOUNT', component: <Account /> },
  { path: '/feedback', key: 'FEEDBACK', component: <Feedback /> },
  { path: '/follow-us', key: 'FOLLOW-US', component: <FollowUs /> },
  { path: '/about', key: 'ABOUT', component: <About /> },
  { path: '/confirm-tx', key: 'CONFIRM-TX', component: <ConfirmTx /> },
  {
    path: '/confirm-tx-unlock-wallet',
    key: 'CONFIRM-TX-UNLOCK-WALLET',
    component: <ConfirmTxUnlockWallet />,
  },
  {
    path: '/tx-success',
    key: 'TX-SUCCESS',
    component: <TxSuccess />,
  },
  {
    path: '/tx-reject',
    key: 'TX-REJECT',
    component: <TxReject />,
  },
  //   {
  //     path: "/app",
  //     key: "APP",
  //     component: () => <h1>App</h1>,
  //     routes: [
  //       {
  //         path: "/app",
  //         key: "APP_ROOT",
  //         exact: true,
  //         component: () => <h1>App Index</h1>,
  //       },
  //       {
  //         path: "/app/page",
  //         key: "APP_PAGE",
  //         exact: true,
  //         component: () => <h1>App Page</h1>,
  //       },
  //     ],
  //   },
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.key} element={route.component} path={route.path} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
