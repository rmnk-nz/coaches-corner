import React, { useState } from 'react';
import '../styles/ProgramForm.css'

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';

const AddUserForm = () => {
    const [formState, setFormState] = useState({ email: '', password: ''});

    const [addUser, { error } ] = useMutation(ADD_USER, {
        update(cache, { data: { addUser } }) {
            try {
                const { users }= cache.readQuery({ query: QUERY_USER });

                cache.writeQuery({
                   query: QUERY_USER,
                   data: { users: [...users,addUser] },
                });
            }catch (e) {
                console.error(e);
            }
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({ ...formState, [name]: value, });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            await addUser({
                variables: { ...formState },
            });
            setFormState({
                email: '',
                password: '',
            });

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='programForm'>
            <form onSubmit={handleFormSubmit}>
            <label>Add New User to Coaches Corner</label>
            <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button type='submit'>Add User</button>
            </form>
            {error && (<div>
                Something went wrong...
            </div>)}
        </div>
    );
}

export default AddUserForm;