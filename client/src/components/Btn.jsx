import React from 'react'
import './Btn.css'

const Btn = ({onClick, text}) => {
  return (
    <button className="butn" onClick={onClick}>{text}</button>
  )
}

export default Btn