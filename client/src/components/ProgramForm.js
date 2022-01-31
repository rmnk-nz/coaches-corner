import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import '../styles/ProgramForm.css';

import { ADD_PROGRAM } from '../utils/mutations';
import { QUERY_PROGRAMS } from '../utils/queries';

const ProgramForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [addProgram] = useMutation(ADD_PROGRAM, {
      update(cache, { data: { addProgram } }) {
          try {
              const { programs } = cache.readQuery({ query: QUERY_PROGRAMS});
              cache.writeQuery({
                  query: QUERY_PROGRAMS,
                  data: { savedPrograms: [addProgram, ...programs]}
              });
            } catch (error) {
                console.error(error);
            } 
        },
    })

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const { data } = await addProgram({ variables: { title, body } });
        console.log(data);
        setTitle('');
        setBody('');
      } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='programForm'>
      <form onSubmit={handleSubmit}>
        <label>Add Your Programming</label>
        <input type='text' 
          required 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea required
        value={body}
        onChange={(e) => setBody(e.target.value)}
        />
        <div>
          <button>SAVE</button>
        </div>
      </form>
    </div>
  );
};

export default ProgramForm;


