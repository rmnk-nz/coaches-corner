import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me($email: String!) {
    admin(email: $email) {
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
  query user($email: String!) {
        user(email: $email) {
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
  query getProgram($title: String!) {
    savedProgram(title: $title) {
      _id
      title
      body
    }
  }
`;