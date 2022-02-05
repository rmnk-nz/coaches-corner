import React from 'react';
import '../styles/ListPrograms.css';
import { useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';
import { REMOVE_PROGRAM } from '../utils/mutations';
import { QUERY_PROGRAMS } from '../utils/queries';


const ListPrograms = ({ programs }) => {

    const [removeProgram, { error }] = useMutation(REMOVE_PROGRAM, {
        update(cache, { data: { removeProgram } }) {
          try {
            cache.writeQuery({
            query: QUERY_PROGRAMS,
            data: { savedPrograms: removeProgram },
            });

            window.location.reload();
            
          } catch (error) {
            console.error(error);
          }
        },
      });

    const handleRemoveProgram = async (title) => {
        try {
            await removeProgram({
            variables: { title }
            });

        } catch (error) {
          console.error(error);
        }

    };

    if (!programs.length) {
        return <h3 className='adminHead'>No Programs Saved</h3>
    }

    return (
        <div className='listProgramsDiv'>
            {programs && programs.map((program) => (
            <div
            key={program.title}
            className='programCard'>
                <Link to={`/program/${program._id}`}>
                <h3>{program.title}</h3>
                </Link>
                <button onClick={() => handleRemoveProgram(program.title)}>X</button>  
            </div>
            ))}
             {error && (
            <h3 className="adminHead">{error.message}</h3>)}
        </div>

    );
}
export default ListPrograms;