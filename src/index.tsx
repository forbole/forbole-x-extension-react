import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import reportWebVitals from './reportWebVitals'
import { HashRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import AppRoutes from './routes/routes'
import { Helmet } from 'react-helmet'
// @ts-ignore
import nightwind from 'nightwind/helper'
import '../src/assets/locales/i18n';

ReactDOM.render(
  <React.StrictMode>
    <>
      <Helmet>
        <script>{nightwind.init()}</script>
      </Helmet>
      <RecoilRoot>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </RecoilRoot>
    </>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
