import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import homeImage from '../images/home.jpg'


import Auth from '../utils/auth';

const UserLogin = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

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
            <h3>User Login</h3>
            {data ? (
                <Link to='/user'>Logged in, continue as User</Link>
            ) : (
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
            )}
            {error && (
              <div>
                {error.message}
              </div>
            )}
        </div>
        <img className='homeImage' src={homeImage} alt='homepageImage'/>
    </>
    );
};

export default UserLogin;