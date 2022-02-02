import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Auth from '../utils/auth';

const Navbar = () => {

  return (
      <nav>
        <div className='navHme'>
          COACHES CORNER
        </div>
        <div className='tabDiv'>
         {
           Auth.loggedIn ? 
           (<>
           <h3 className='navTabs'>
              <Link to="/adminlogin">
              ADMIN
              </Link>
            </h3><h3 className='navTabs'>
              <Link to="/userlogin">
                USER
              </Link>
            </h3></>)
          : (<>
            <h3 className='navTabs'>
              <Link to="/" onClick={Auth.logout}>
                LOGOUT
              </Link></h3></>)
          }
        </div>
      </nav>
  );
}
export default Navbar