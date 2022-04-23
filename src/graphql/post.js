import { gql } from '@apollo/client';

const FETCH_POSTS_QUERY = gql`
    query ($postId: ID) {
        getPosts(postId: $postId) {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            commentCount
            comments {
                id
                createdAt
                username
                body
            }
        }
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export {
    FETCH_POSTS_QUERY,
    CREATE_POST_MUTATION,
    LIKE_POST_MUTATION,
    DELETE_POST_MUTATION,
    CREATE_COMMENT_MUTATION,
    DELETE_COMMENT_MUTATION,
};
