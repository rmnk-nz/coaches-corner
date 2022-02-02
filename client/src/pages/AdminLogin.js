import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_ADMIN } from '../utils/mutations';
import homeImage from '../images/home.jpg'


import Auth from '../utils/auth';

const AdminLogin = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_ADMIN);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
    };

     
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await login({
            variables: { ...formState },
        });

            Auth.login(data.login.token);

        } catch (e) {
            console.error(e);
        }

        setFormState({
        email: '',
        password: '',
        });
    };

    return (
    <>
      <div className='loginDiv'>
        <h3>Admin Login</h3>
        {data ? (
                <Link to='/admin'><h3>Logged in, continue as Admin</h3></Link>)
              : (
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
              )
            }
            {error && (
              <h3>
                {error.message}
              </h3>
            )}
      </div>
        <img className='homeImage' src={homeImage} alt='homepageImage'/>
    </>
    );
};

export default AdminLogin;