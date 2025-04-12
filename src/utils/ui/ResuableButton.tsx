import React from 'react'

const ResuableButton = ({text, onFunction, size}) => {
  return (
    <div>
        <button className='bg-red-400 p-5 rounded-4xl' style={{width: `${size}%`}} onClick={onFunction}>{text}</button>
    </div>
  )
}

export default ResuableButton