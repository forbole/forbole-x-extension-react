function injectScript(file: any, node: any) {
  const th = document.getElementsByTagName(node)[0]
  const s = document.createElement('script')
  s.setAttribute('type', 'text/javascript')
  s.setAttribute('src', file)
  th.appendChild(s)
}

injectScript(chrome.runtime.getURL('/scriptToInject.js'), 'body')

window.addEventListener('message', async (e: any) => {
  if (e.data && e.data.target === 'Forbole X') {
    chrome.runtime.sendMessage(chrome.runtime.id, {
      event: e.data.event,
      data: e.data.data,
    })
  }
})

export {}
