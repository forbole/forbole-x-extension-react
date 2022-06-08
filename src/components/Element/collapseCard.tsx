import React, { useState } from 'react'
import Collapse from '@mui/material/Collapse'
import { ReactComponent as ArrowDownIcon } from '../../assets/images/icons/icon_arrow_down.svg'
import Markdown from '../Markdown'

type Props = {
  question: string
  answer: string
}

const CollapseCard = ({ question, answer }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="bg-surface-100 rounded-lg px-6 py-4 my-2">
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => {
          setOpen(!open)
        }}
        aria-hidden="true"
      >
        <p>{question}</p>
        <ArrowDownIcon className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="bg-divider-100 w-full h-px my-3" />
        <Markdown>{answer}</Markdown>
      </Collapse>
    </div>
  )
}

export default CollapseCard
