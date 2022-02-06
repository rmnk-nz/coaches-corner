const { gql } = require('apollo-server-express');

const typeDefs = gql `
type Program {
    _id: ID
    title: String!
    body: String!
}

type Admin {
    _id: ID
    email: String!
    savedPrograms: [Program]
}

type User {
    _id: ID
    email: String!
    savedPrograms: [Program]
}

type Auth {
    token: ID!
    admin: Admin
    user: User
}
type Query {
    me: [Admin]
    users: [User]
    savedPrograms: [Program]
    savedProgram(programId: ID!): Program
}

type Mutation {
    loginAdmin(email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    addUser(email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    addProgram(title: String!, body: String!): Program
    removeProgram(title: String!): Program
}
`;

module.exports = typeDefs;