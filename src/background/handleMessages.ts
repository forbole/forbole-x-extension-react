import openChromeExtension from './misc/openChromeExtension'

const handleMessages = async (
  request: any,
  sender: any,
  sendResponse: (response?: any) => void
): Promise<void> => {
  openChromeExtension(request.data)
}

export default handleMessages
