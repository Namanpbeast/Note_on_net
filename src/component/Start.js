import React from 'react'
import { Link } from 'react-router-dom'
import './Start.css'; // Add a custom CSS file

const Start = () => {
  return (
    <div className='start-container'>
      {/* Add a title section here */}
      <div className='app-title'>
        <h1>Note on Net</h1>
        <p>Your Ultimate Note-Taking Application</p>
      </div>
      <div className='start-buttons'>
        <Link className="btn custom-btn my-2" to="/login" role="button">Log In</Link>
        <Link className="btn custom-btn my-2" to="/signup" role="button">Sign Up</Link>
      </div>
    </div>
  )
}

export default Start
