import CryptoJS from "crypto-js";

export const encryptAndSaveToChromeStorage = (
  key: string,
  value: any,
  password: string
) =>
  new Promise((resolve, reject) => {
    chrome.storage.local.set(
      {
        [key]: CryptoJS.AES.encrypt(JSON.stringify(value), password).toString(),
      },
      () => {
        resolve({ success: true });
      }
    );
  });

export const decryptChromeStorage = <T>(
  key: string,
  password: string
): Promise<T> =>
  new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      try {
        const decrypted: T = JSON.parse(
          CryptoJS.AES.decrypt(result[key], password).toString(
            CryptoJS.enc.Utf8
          )
        );
        resolve(decrypted);
      } catch (err) {
        reject(new Error("incorrect password"));
      }
    });
  });
