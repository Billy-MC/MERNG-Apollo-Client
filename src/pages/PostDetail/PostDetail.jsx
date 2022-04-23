import { useEffect, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

import {
    Grid,
    Image,
    Card,
    Button,
    Icon,
    Label,
    Transition,
} from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from 'graphql/post';
import img from 'assets/images/steve.jpeg';
import LikeButton from 'components/Button/LikeButton';
import DeleteButton from 'components/Button/DeleteButton';
import { AuthContext } from 'store/auth-context';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { Row, Column } = Grid;
    const { Group } = Transition;
    const { Content, Header, Meta, Description } = Card;

    const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
        variables: { postId },
    });

    useEffect(() => {
        if (data) {
            setPost(data.getPosts[0]);
        }
    }, [data]);

    const pushToHomeHandler = () => {
        navigate('/');
    };

    return (
        <>
            <h1>Detail Page</h1>
            {loading || !post ? (
                <p>Loading...</p>
            ) : (
                <Grid>
                    <Row style={{ alignItems: 'center' }}>
                        <Column width={2}>
                            <Image
                                src={img}
                                size="small"
                                float="right"
                            />
                        </Column>
                        <Column width={10}>
                            <Card fluid>
                                <Content>
                                    <Header>{post.username}</Header>
                                    <Meta>
                                        {moment(
                                            +post.createdAt,
                                        ).fromNow()}
                                    </Meta>
                                    <Description>
                                        {post.body}
                                    </Description>
                                </Content>
                                <Content extra>
                                    <LikeButton
                                        user={user}
                                        post={post}
                                    />
                                    <Button
                                        labelPosition="right"
                                        as="div"
                                    >
                                        <Button color="blue" basic>
                                            <Icon name="comments" />
                                        </Button>
                                        <Label
                                            basic
                                            color="blue"
                                            pointing="left"
                                        >
                                            {post.commentCount}
                                        </Label>
                                    </Button>
                                    {user?.username ===
                                        post.username && (
                                        <DeleteButton
                                            postId={postId}
                                            pushAddress={
                                                pushToHomeHandler
                                            }
                                        />
                                    )}
                                </Content>
                            </Card>
                            <Group>
                                {post.comments.map(comment => (
                                    <Card fluid key={comment.id}>
                                        <Content>
                                            {user?.username ===
                                                comment.username && (
                                                <DeleteButton
                                                    postId={postId}
                                                    commentId={
                                                        comment.id
                                                    }
                                                />
                                            )}
                                            <Header>
                                                {comment.username}
                                            </Header>
                                            <Meta>
                                                {moment(
                                                    +comment.createdAt,
                                                ).fromNow()}
                                            </Meta>
                                            <Description>
                                                {comment.body}
                                            </Description>
                                        </Content>
                                    </Card>
                                ))}
                            </Group>
                        </Column>
                    </Row>
                </Grid>
            )}
        </>
    );
};

export default PostDetail;
