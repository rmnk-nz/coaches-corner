import React from 'react';

import {  useHistory } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_USER } from '../utils/queries';

import AddUserForm from '../components/AddUserForm';


function AdminUser() {
    const history = useHistory();
//   const { loading, data } = useQuery(QUERY_USER);
//   const programData = data?.savedPrograms || [];

  return <>
    <div className='adminHeader'>
        <button
        className='goBack'
        onClick={() => history.goBack()}>
        &larr; Go Back
        </button>
        <h3 className='adminHead'>Members Hub gives access to add and track active members on the coaches corner app</h3>
    </div>
    <AddUserForm />
    <h3 className='adminHead'>Active Members:</h3>
    {/* {loading ? 
        (<div>....Loading</div>)
        :
        (<ListPrograms
         programs={programData}
        />)
    } */}
  </>;
};

export default AdminUser