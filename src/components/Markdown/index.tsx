import React from 'react'
import ReactMarkdown from 'markdown-to-jsx'

const options = {
  disableParsingRawHTML: true,
  forceBlock: true,
  overrides: {
    a: {
      component: <link />,
      props: {
        target: '_blank',
        onClick: (e) => e.stopPropagation(),
      },
    },
  },
}

const Markdown = (props: any) => {
  return <ReactMarkdown options={options} {...props} />
}

export default Markdown
