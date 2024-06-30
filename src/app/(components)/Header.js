import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">AirBnb</Link> {/* Use 'to' for React Router */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarID" 
          aria-controls="navbarID" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarID">
          <ul className="navbar-nav"> {/* Use 'ul' for list items */}
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" href="/">Home</Link> 
            </li>
            {/* Add more navigation items here */}
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Header