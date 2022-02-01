import React from 'react';
import '../styles/Admin.css';
import { useQuery } from '@apollo/client';
import { QUERY_PROGRAMS } from '../utils/queries';
import ProgramForm from '../components/ProgramForm';

function Admin() {
  const { loading, data } = useQuery(QUERY_PROGRAMS);
  const programData = data?.savedPrograms || [];

  if (loading) {
    return <div>....loading</div>
  }
  return <>
      <h3 className='adminHead'>Welcome Back Coach!!</h3>
      <ProgramForm />
      <h3 className='adminHead'>Saved Programming:</h3>
      <h4>{programData.title}</h4>
      <p>{programData.body}</p>
  </>;
};

export default Admin
