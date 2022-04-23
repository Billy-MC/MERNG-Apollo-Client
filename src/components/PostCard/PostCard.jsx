import { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from 'store/auth-context';
import LikeButton from 'components/Button/LikeButton';
import DeleteButton from 'components/Button/DeleteButton';
import img from 'assets/images/steve.jpeg';

const PostCard = props => {
    const {
        post: {
            body,
            createdAt,
            id,
            username,
            likeCount,
            commentCount,
            likes,
        },
    } = props;
    const { Content, Header, Meta, Description } = Card;
    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Content>
                <Image floated="right" size="mini" src={img} />
                <Header>{username}</Header>
                <Meta as={Link} to={`/post/${id}`}>
                    {moment(+createdAt).fromNow()}
                </Meta>
                <Description>{body}</Description>
            </Content>
            <Content extra>
                <LikeButton
                    user={user}
                    post={{ likeCount, likes, id }}
                />
                <Button
                    labelPosition="right"
                    as={Link}
                    to={`/post/${id}`}
                >
                    <Button color="blue" basic>
                        <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                        {commentCount}
                    </Label>
                </Button>
                {user?.username === username && (
                    <DeleteButton postId={id} />
                )}
            </Content>
        </Card>
    );
};

export default PostCard;
