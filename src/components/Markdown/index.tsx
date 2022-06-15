import React from 'react'
import ReactMarkdown from 'markdown-to-jsx'

const options = {
  disableParsingRawHTML: true,
  forceBlock: true,
  overrides: {
    a: {
      props: {
        target: '_blank',
        class: 'text-primary-100 underline hover:opacity-80',
        onClick: (e) => e.stopPropagation(),
      },
    },
    ul: {
      props: {
        class: 'ml-5 list-disc',
      },
    },
    ol: {
      props: {
        class: 'ml-5 list-decimal',
      },
    },
  },
}

const Markdown = (props: any) => {
  return <ReactMarkdown options={options} {...props} />
}

export default Markdown
