import React from 'react';
import '../styles/SingleProgram.css'

import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PROGRAM } from '../utils/queries';

const SingleProgram = () => {
    // const location = useLocation();
    const history = useHistory();

    const { programId } = useParams();
    const { loading, data } = useQuery(QUERY_PROGRAM, {
        variables: { programId: programId },
    });

    const program = data?.savedProgram || {};

    if (loading) {
        return <div>...loading</div>
    }
    return (<>
        <button
        className='goBack'
        onClick={() => history.goBack()}
        >
         &larr; Go Back
       </button>
        <div className='singleProgramDiv'>
            <h3>{program.title}</h3>
            {program.body.split("\n").map((str, i) => <p key= {i}>{str}</p>)}
        </div>
    </>)
}

export default SingleProgram;