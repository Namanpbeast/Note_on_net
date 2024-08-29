import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css';
const Navbar = () => {
  let navigate=useNavigate();;
  const handleLogOut=()=>{
    localStorage.removeItem('token');
    navigate("/")
  }
  return (
    <div>
      <nav className=" navbar navbar-dark bg-dark  navbar-expand-lg ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Note On Net</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
     { localStorage.getItem('token')?<button type="button" className="btn custom-btn" onClick={handleLogOut}>Log Out</button>:""}
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
