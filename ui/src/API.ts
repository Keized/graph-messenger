import { gql } from "@apollo/client";

export const GUEST_LOGIN_MUTATION  = gql`
    mutation guestLogin($name: String!) {
        guest_login(name: $name) {
            guest {
                id
            }
        }
    }
`;

export const MESSAGE_MUTATION  = gql`
    mutation CreateMessage($content: String!, $guestId: ID!) {
        createMessage(content: $content, guestId: $guestId) {
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
                name
                id
            }
            createdAt
            id
            content
        }
    }
`;

export const MESSAGES_SUBSCRIPTION = gql`
    subscription messageAdded {
        messageAdded {
            author {
                name
                id
            }
            createdAt
            id
            content
        }
    }
`;
