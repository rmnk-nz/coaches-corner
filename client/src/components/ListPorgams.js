import React from 'react';
import '../styles/ListPrograms.css';

import { Link } from 'react-router-dom';


const ListPrograms = ({ programs }) => {
    if (!programs.length) {
        return <h3>No Programs Saved</h3>
    }

    return (
        <div className='listProgramsDiv'>
            {programs && programs.map((programs) => (
            <>
            <div className='programCard'>
                <Link to={`/program/${programs._id}`}>
                <h3>{programs.title}</h3>
                </Link>
            </div>
            </>
            ))}
        </div>

    );
}
export default ListPrograms;