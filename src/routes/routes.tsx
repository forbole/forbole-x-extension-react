import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Account from '../pages/account'
import AddressBook from '../pages/address-book'
import Setting from '../pages/setting'
import Wallet from '../pages/wallet'

interface Props {}

const routes = [
  { path: '/', key: 'ROOT', exact: true, component: <Wallet /> },
  { path: '/setting', key: 'SETTING', exact: true, component: <Setting /> },
  { path: '/address-book', key: 'ADDRESS-BOOK', exact: true, component: <AddressBook /> },
  { path: '/account/:address', key: 'ACCOUNT', component: <Account /> },
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
]

const AppRoutes = (props: Props) => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.key} element={route.component} path={route.path} />
      ))}
    </Routes>
  )
}

export default AppRoutes
