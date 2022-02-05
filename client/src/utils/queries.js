import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    admin {
        _id
        email
        savedPrograms {
            _id
            title
            body
        }
    }
}
`;

export const QUERY_USER = gql`
  query users {
      users {
        _id
        email
      }
}
`;

export const QUERY_PROGRAMS = gql`
  query getPrograms {
    savedPrograms {
      _id
      title
      body
    }
  }
`;

export const QUERY_PROGRAM = gql`
  query getProgram($programId: ID!) {
    savedProgram(programId: $programId) {
      _id
      title
      body
    }
  }
`;