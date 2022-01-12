import CryptoJS from 'crypto-js'

const decryptMnemonic = (encryptedMnemonic: string, securityPassword: string): Promise<string> =>
  new Promise((resolve, reject) => {
    try {
      const mnemonic = CryptoJS.AES.decrypt(encryptedMnemonic, securityPassword).toString(
        CryptoJS.enc.Utf8
      )
      if (!mnemonic) {
        return reject(new Error('incorrect password'))
      }
      return resolve(mnemonic)
    } catch (err: any) {
      return reject(new Error('incorrect password'))
    }
  })

export default decryptMnemonic
