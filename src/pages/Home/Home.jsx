import { useQuery, gql } from '@apollo/client';
import PostCard from 'components/PostCard';
import { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import styles from './Home.module.css';

const FETCH_POSTS_QUEST = gql`
    {
        getPosts {
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

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUEST);
    const { Row, Column } = Grid;

    return (
        <Grid columns={3}>
            <Row className={styles['page-title']}>
                <h1>Recent Posts</h1>
            </Row>
            <Row>
                {loading ? (
                    <h1>Loading posts...</h1>
                ) : (
                    !!data &&
                    data.getPosts.map(post => (
                        <Column
                            key={post.id}
                            style={{ marginBottom: 20 }}
                        >
                            <PostCard post={post} />
                        </Column>
                    ))
                )}
            </Row>
        </Grid>
    );
};

export default Home;
