import { gql } from '@apollo/client';

export const LOGIN_ADMIN = gql`
mutation loginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
        token 
        admin {
            _id
            email
        }
    }
}
`;

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        token
        user {
            _id
            email
        }
    }
}
`;

export const ADD_PROGRAM = gql`
mutation addProgram($title: String!, $body: String!) {
    addProgram(title: $title, body: $body) {
        title
        body
    }
}
`;

export const REMOVE_PROGRAM = gql`
mutation removeProgram($title: String!, $body: String!) {
    removeProgram(title: $title, body: $body) {
        title
        body
    }
}
`;