import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';


const Navbar = () => {
  
  return (
      <nav>
        <div className='navHme'>
          <Link to="/">
          COACHES CORNER
          </Link>
        </div>
        <div className='tabDiv'>
          <h3 className='navTabs'>
            <Link to="/admin">
            ADMIN
            </Link>
          </h3>
          <h3 className='navTabs'>
            <Link to="/user">
            USER
            </Link>
          </h3>
        </div>
      </nav>
  );
}
export default Navbar