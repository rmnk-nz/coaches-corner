import React, { useState } from 'react';
import '../styles/Login.css';

import { useMutation } from '@apollo/client';
import { LOGIN_ADMIN } from '../utils/mutations';
import adminImage from '../images/admin.jpg'


import Auth from '../utils/auth';

const AdminLogin = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_ADMIN);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
    };

     
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
            variables: { ...formState },
        });

        Auth.login(data.loginAdmin.token);
        window.location.href= "/admin";

        } catch (e) {
            console.error(e);
        }
    };
    return (
    <>
      <div className='loginDiv'>
        <h3>Admin Login</h3>    
                <form onSubmit={handleFormSubmit}>
                  <input
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <input
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              
            {error && (
              <h3>
                {error.message}
              </h3>
            )}
      </div>
        <img className='homeImage' src={adminImage} alt='homepageImage'/>
    </>
    );
};

export default AdminLogin;