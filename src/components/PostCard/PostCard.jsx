import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import img from '../../assets/images/steve.jpeg';

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

    const likePostHandler = e => {
        e.preventDefault();
    };
    const commentPostHandler = e => {
        e.preventDefault();
    };
    return (
        <Card fluid>
            <Content>
                <Image floated="right" size="mini" src={img} />
                <Header>{username}</Header>
                <Meta as={Link} to={`/posts/${id}`}>
                    {moment(+createdAt).fromNow()}
                </Meta>
                <Description>{body}</Description>
            </Content>
            <Content extra>
                <Button
                    as="div"
                    labelPosition="right"
                    onClick={likePostHandler}
                >
                    <Button color="teal" basic>
                        <Icon name="heart" />
                    </Button>
                    <Label basic color="teal" pointing="left">
                        {likeCount}
                    </Label>
                </Button>
                <Button
                    as="div"
                    labelPosition="right"
                    onClick={commentPostHandler}
                >
                    <Button color="blue" basic>
                        <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                        {commentCount}
                    </Label>
                </Button>
            </Content>
        </Card>
    );
};

export default PostCard;
