import React from 'react';

const ListPrograms = ({ programs }) => {
    if (!programs.length) {
        return <h3>No Programs Saved</h3>
    }

    return (
        <div>
            {programs && programs.map((programs) => (
            <>
            <h3>{programs.title}</h3>
            <p>{programs.body}</p>
            </>
            ))}
        </div>

    );
}
export default ListPrograms;