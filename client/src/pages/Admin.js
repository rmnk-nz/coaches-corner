import React from 'react';
import '../styles/Admin.css';

import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROGRAMS } from '../utils/queries';

import ProgramForm from '../components/ProgramForm';
import ListPrograms from '../components/ListPorgams';



function Admin() {
  const { loading, data } = useQuery(QUERY_PROGRAMS);
  const programData = data?.savedPrograms || [];

  return <>
    <div className='adminHeader'>
      <h3 className='adminHead'>Welcome Back Coach!!</h3>
      <Link to={'admin/user'}>
      <h3 className='hubLink'>MEMBERS HUB</h3>
      </Link>
    </div>
      <ProgramForm />
      <h3 className='adminHead'>Saved Programming:</h3>
      {loading ? 
        (<div>....Loading</div>)
        :
        (<ListPrograms
         programs={programData}
        />)
      }
  </>;
};

export default Admin
