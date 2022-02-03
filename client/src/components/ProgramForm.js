import React, { useState } from 'react';
import '../styles/ProgramForm.css';

import { useMutation } from '@apollo/client';
import { ADD_PROGRAM } from '../utils/mutations';
import { QUERY_PROGRAMS } from '../utils/queries';

const ProgramForm = () => {
  const [formState, setFormState] = useState({
    title: '',
    body: '', 
  });
 
  const [addProgram, { error }] = useMutation(ADD_PROGRAM, {
      update(cache, { data: { addProgram } }) {
        try {
         const { savedPrograms } = cache.readQuery({ query: QUERY_PROGRAMS });

         cache.writeQuery({ 
          query: QUERY_PROGRAMS,
          data: { savedPrograms: [...savedPrograms,addProgram] }
          });
        } catch (e) {
          console.error(e);
        }
      }  
  });
  

  const handleSubmit = async (event) => {
    event.preventDefault();

      try {
        await addProgram({
          variables: { ...formState },
        });
  
        setFormState({
          title: '',
          body: '',
        });
      } catch (err) {
        console.error(err);
      }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setFormState({ ...formState, [name]: value });
    } else if (name !== 'title') {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div className='programForm'>
      <form onSubmit={handleSubmit}>
        <label>Add Your Programming</label>
        <input type='text' 
          required
          name='title' 
          value={formState.title} 
          onChange={handleChange} 
        />
        <textarea required
        name='body'
        value={formState.body}
        onChange={handleChange}
        />
        <div>
          <button type='submit'>SAVE</button>
        </div>
      </form>
      {error && (
          <div>
            Something went wrong...
          </div>
        )}
    </div>
  );
};

export default ProgramForm;


