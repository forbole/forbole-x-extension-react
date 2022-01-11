import handleExternalMessages from './handleExternalMessages'
import handleMessages from './handleMessages'

// Only accessible on Forbole X web app
chrome.runtime.onMessageExternal.addListener(handleExternalMessages)
// Accessible on centent scripts, ie all urls
chrome.runtime.onMessage.addListener(handleMessages)
