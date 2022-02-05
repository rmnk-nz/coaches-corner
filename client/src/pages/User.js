import React from 'react';
import UserList from '../components/UserList';

import { useQuery } from '@apollo/client';
import { QUERY_PROGRAMS } from '../utils/queries';

function User() {
  const { loading, data } = useQuery(QUERY_PROGRAMS);
  const programData = data?.savedPrograms || [];

  return <div>
      <h3 className='adminHead'>Let's Get To Work!!</h3>
      {loading ? 
        (<div>....Loading</div>)
      :
        (<UserList programs={programData} />)
      }
  </div>;
};

export default User