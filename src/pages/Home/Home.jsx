import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import PostCard from 'components/PostCard';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from 'store/auth-context';
import PostForm from 'components/PostForm';
import { FETCH_POSTS_QUEST } from 'graphql/post';
import styles from './Home.module.css';

const Home = () => {
    const authCtx = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUEST);
    const { Row, Column } = Grid;

    return (
        <Grid columns={3}>
            <Row className={styles['page-title']}>
                <h1>Recent Posts</h1>
            </Row>
            <Row>
                {authCtx.user && (
                    <Column>
                        <PostForm />
                    </Column>
                )}
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
