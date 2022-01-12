import React from 'react'

interface Props {
    children: JSX.Element;   
}

const ButtonArea = ({children}: Props) => {
    return (
        <div className='border hover:border-gray-500 rounded-sm cursor-pointer'>
            {children}  
        </div>
    )
}

export default ButtonArea
