import openChromeExtension from './misc/openChromeExtension';

chrome.runtime.onMessage.addListener(
  async (request: any, sender: any, sendResponse: (response?: any) => void): Promise<void> => {
    openChromeExtension(request.data);
  }
);
