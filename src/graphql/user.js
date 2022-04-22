import { gql } from '@apollo/client';

const LOGIN_USER = gql`
    mutation login($username: String, $password: String!) {
        login(
            loginInput: { username: $username, password: $password }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export { LOGIN_USER, REGISTER_USER };
