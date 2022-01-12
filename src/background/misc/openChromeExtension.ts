import qs from 'query-string'

const openChromeExtension = (params: any) => {
  const query: any = { fromWeb: true }
  Object.keys(params).forEach((key) => {
    if (typeof params[key] === 'string') {
      query[key] = params[key]
    } else {
      query[key] = JSON.stringify(params[key])
    }
  })
  chrome.windows.create(
    {
      url: qs.stringifyUrl({ url: 'index.html', query }),
      type: 'popup',
      width: 520,
      height: 620,
      top: 0,
      left: 0,
    },
    (window) => {
      if (window) {
        setTimeout(
          () =>
            chrome.windows.update(window.id, {
              width: 520,
              height: 620,
              focused: true,
            }),
          1000
        )
      }
    }
  )
}

export default openChromeExtension
