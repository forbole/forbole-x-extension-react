import React from 'react'

interface Props {
    children: JSX.Element;  
    onClick?: React.MouseEventHandler
}

const ButtonArea = ({children, onClick}: Props) => {
    return (
        <div className='border hover:border-gray-500 rounded-sm cursor-pointer' onClick={onClick}>
            {children}  
        </div>
    )
}

export default ButtonArea
