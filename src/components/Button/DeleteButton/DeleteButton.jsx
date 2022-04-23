import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Icon, Confirm } from 'semantic-ui-react';

import {
    DELETE_POST_MUTATION,
    DELETE_COMMENT_MUTATION,
} from 'graphql/post';

const DeleteButton = props => {
    const { postId, pushAddress, commentId } = props;
    const [openModal, setOpenModal] = useState(false);

    const mutation = commentId
        ? DELETE_COMMENT_MUTATION
        : DELETE_POST_MUTATION;

    const [deletePostOrMutation] = useMutation(mutation, {
        variables: { postId, commentId },
        update(cache) {
            setOpenModal(false);
            if (!commentId) {
                cache.modify({
                    fields: {
                        getPosts(cachePosts, { readField }) {
                            return cachePosts.filter(
                                Post =>
                                    postId !== readField('id', Post),
                            );
                        },
                    },
                });
            }
            if (pushAddress) pushAddress();
        },
    });

    const openModalHandler = () => {
        setOpenModal(true);
    };

    const closeModalHandler = () => {
        setOpenModal(false);
    };
    return (
        <>
            <Button
                as="div"
                color="red"
                floated="right"
                onClick={openModalHandler}
            >
                <Icon
                    name="trash"
                    style={{
                        margin: 0,
                    }}
                />
            </Button>
            <Confirm
                open={openModal}
                onCancel={closeModalHandler}
                onConfirm={deletePostOrMutation}
            />
        </>
    );
};
export default DeleteButton;
