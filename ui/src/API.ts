import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

export const LOGIN_MUTATION  = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
            }
        }
    }
`;

export const MESSAGE_MUTATION  = gql`
    mutation CreateMessage($content: String!) {
        createMessage(content: $content) {
            id
            createdAt
            content
            author {
                id
            }
        }
    }
`;

export const ALL_MESSAGES = gql`
    query AllMessages {
        allMessages {
            author {
                email
                id
            }
            createdAt
            id
            content
        }
    }
`;
