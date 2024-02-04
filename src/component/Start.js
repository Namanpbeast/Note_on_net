import React from 'react'
import {Link} from 'react-router-dom'
const Start = () => {
  return (
    <div className='container my-5 '>
      <div className='d-flex justify-content-center my-2'><Link className="btn btn-primary mx-1" to="/login" role="button">Log In</Link></div>
      <div className='d-flex justify-content-center my-2'><Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link></div>
    </div>
  )
}

export default Start
