import React, { useContext } from 'react'
import NoteContext from '../context/noteContext'
const Alert = () => {
    const context=useContext(NoteContext)
    const { message,type }=context
  return (
    <div className={`alert alert-${type}`} role="alert">
    {message}
  </div>
  )
}

export default Alert
