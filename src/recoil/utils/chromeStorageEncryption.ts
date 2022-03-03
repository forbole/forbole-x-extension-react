import CryptoJS from 'crypto-js'

export const getStorage = async (key: string) => {
  if (chrome.storage) {
    return await require('@extend-chrome/storage').local.get(key)[key]
  } else {
    return Promise.resolve(localStorage.getItem(key))
  }
}

export const setStorage = async (items: { [key: string]: string }) => {
  if (chrome.storage) {
    await require('@extend-chrome/storage').local.set(items)
    return
  } else {
    Object.keys(items).forEach((key) => {
      localStorage.setItem(key, items[key])
    })
    return Promise.resolve()
  }
}

export const encryptAndSaveToChromeStorage = async (key: string, value: any, password: string) => {
  await setStorage({
    [key]: CryptoJS.AES.encrypt(JSON.stringify(value), password).toString(),
  })
  return { success: true }
}

export const decryptChromeStorage = async <T>(
  key: string,
  password: string,
  defaultValue?: T
): Promise<T> => {
  const result = await getStorage(key)
  try {
    const decrypted: T = JSON.parse(
      CryptoJS.AES.decrypt(result, password).toString(CryptoJS.enc.Utf8)
    )
    return decrypted
  } catch (err) {
    if (defaultValue) {
      return defaultValue
    } else {
      throw new Error('incorrect password')
    }
  }
}
