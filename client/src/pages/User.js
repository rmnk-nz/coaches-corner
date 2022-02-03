import React from 'react';
import ListPrograms from '../components/ListPorgams';

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
        (<ListPrograms programs={programData} />)
      }
  </div>;
};

export default User