import React, { useState } from 'react';
import '../styles/Admin.css';

function Admin() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      const programData = { title, body };
      console.log(programData);
  };

  return <div className='admin'>
        <h3 className='welcome'>Welcome Back Coach!!</h3>
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
      <h3 className='welcome'>Programming History:</h3>
  </div>;
};

export default Admin
