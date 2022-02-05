import React from 'react';
import '../styles/ListPrograms.css';

const ListUsers = ({ users }) => {
    if (!users.length) {
        return<h3 className='adminHead'>No Active Members</h3>
    }

    return (
        <div className='listProgramsDiv'>
            {users && users.map((user) => (
            <div
            key={user._id}
            className='programCard'>
                <h3>{user.email}</h3>
            </div>))}
        </div>
    );
}

export default ListUsers;