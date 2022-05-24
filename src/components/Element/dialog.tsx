import React from 'react'
import { ReactComponent as CloseIcon } from '../../assets/images/icons/icon_cross.svg'
import { ReactComponent as ArrowLeftIcon } from '../../assets/images/icons/arrow_left.svg'
import useIconProps from '../../misc/useIconProps'

interface Props {
  open: boolean
  onClose?: (open: boolean) => void
  toPrevStage?: () => void

  title?: string
  description?: React.ReactNode
  children: React.ReactNode
}

const Dialog = ({ open, onClose, title, children, toPrevStage, description }: Props) => {
  const iconProps = useIconProps()

  return (
    open && (
      <div className="fixed top-0 w-full bg-backgroundColor-100 h-full pt-5 overflow-auto">
        <div className={`flex ${toPrevStage ? 'justify-between' : 'justify-end'} mx-5 h-7`}>
          {toPrevStage && (
            <ArrowLeftIcon
              className={`${iconProps} w-6 h-4 mt-1 cursor-pointer`}
              onClick={() => {
                toPrevStage()
              }}
            />
          )}
          {onClose && (
            <CloseIcon
              className={`${iconProps} cursor-pointer`}
              onClick={() => {
                onClose(false)
              }}
            />
          )}
        </div>
        <div className="space-y-2">
          <h2 className="text-font-100 text-center">{title}</h2>
          <p className="text-font-200 text-center px-4">{description}</p>
        </div>
        {children}
      </div>
    )
  )
}

export default Dialog
