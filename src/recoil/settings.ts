import { atom } from 'recoil'
import { getStorage, setStorage } from './utils/chromeStorageEncryption'

export const currencyState = atom<string>({
  key: 'currency',
  default: (async () => {
    const currency = await getStorage('currency')
    return currency ?? 'HKD'
  })(),
  effects: [
    ({ onSet }) => {
      onSet((currency) => setStorage({ currency }))
    },
  ],
})

export const languageState = atom<string>({
  key: 'language',
  default: (async () => {
    const language = await getStorage('language')
    return language ?? 'English'
  })(),
  effects: [
    ({ onSet }) => {
      onSet((language) => setStorage({ language }))
    },
  ],
})
