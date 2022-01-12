import CryptoJS from 'crypto-js'

const decryptStorage = <P>(
  encryptedString: string,
  password: string,
  defaultValue?: P
): Promise<P> =>
  new Promise((resolve, reject) => {
    try {
      const result = JSON.parse(
        CryptoJS.AES.decrypt(encryptedString, password).toString(CryptoJS.enc.Utf8)
      )
      resolve(result)
    } catch (err: any) {
      if (defaultValue) {
        resolve(defaultValue)
      } else {
        reject(new Error('incorrect password'))
      }
    }
  })

export default decryptStorage
