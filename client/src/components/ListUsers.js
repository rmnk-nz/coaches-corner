import { useMutation } from '@apollo/client';
import React from 'react';
import '../styles/ListPrograms.css';
import { REMOVE_USER } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';

const ListUsers = ({ users }) => {

    const [removeUser, { error }] = useMutation(REMOVE_USER, {
        update(cache, { data: { removeUser } }) {
            try {
                cache.writeQuery({
                    query: QUERY_USER,
                    data: { users: removeUser },
                });

                window.location.reload();

            } catch (error) {
            console.error(error);
            }
        },
    });

    const handleRemoveUser = async (userId) => {
        try {
            console.log(userId);
            await removeUser({
            variables: { userId: userId }
            });

        } catch (error) {
          console.error(error);
        }

    };

    if (!users.length) {
        return<h3 className='adminHead'>No Active Members</h3>
    }

    return (<>
        <div className='listProgramsDiv'>
            {users && users.map((user) => (
            <div
            key={user._id}
            className='programCard'>
                <h3>{user.email}</h3>
                <button onClick={() => handleRemoveUser(user._id)}>X</button>
            </div>))}
        </div>
         {error && (
        <h3 className="adminHead">{error.message}</h3>)}
    </>);
}

export default ListUsers;