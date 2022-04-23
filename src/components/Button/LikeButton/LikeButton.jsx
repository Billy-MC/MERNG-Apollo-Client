import { useEffect, useState } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { LIKE_POST_MUTATION } from 'graphql/post';

const LikeButton = props => {
    const {
        user,
        post: { id, likeCount, likes },
    } = props;

    const [liked, setLiked] = useState(false);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },
    });

    useEffect(() => {
        if (
            user &&
            likes.find(like => like.username === user.username)
        ) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    return (
        <Button as="div" labelPosition="right" onClick={likePost}>
            {user ? (
                <Button color="teal" basic={!liked}>
                    <Icon name="heart" />
                </Button>
            ) : (
                <Button color="teal" basic as={Link} to="/login">
                    <Icon name="heart" />
                </Button>
            )}
            <Label basic color="teal" pointing="left">
                {likeCount}
            </Label>
        </Button>
    );
};
export default LikeButton;
