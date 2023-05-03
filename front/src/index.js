import React from 'react'
import ReactDOM from 'react-dom'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import 'react-toastify/dist/ReactToastify.css';

i18n
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['fr', 'ar'],
    fallbackLng: 'fr',
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    // backend: {
    //  loadPath: '/locales/{{lng}}/translation.json',
    // },

    react: { useSuspense: false }
  })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

