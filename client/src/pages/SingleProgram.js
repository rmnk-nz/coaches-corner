import React from 'react';
import '../styles/SingleProgram.css'

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PROGRAM } from '../utils/queries';

const SingleProgram = () => {

    const { programId } = useParams();
    const { loading, data } = useQuery(QUERY_PROGRAM, {
        variables: { programId: programId },
    });

    const program = data?.savedProgram || {};

    if (loading) {
        return <div>...loading</div>
    }
    return (
        <div className='singleProgramDiv'>
            <h3>{program.title}</h3>
            {program.body.split("\n").map((str, i) => <p key= {i}>{str}</p>)}
        </div>
    )
}

export default SingleProgram;