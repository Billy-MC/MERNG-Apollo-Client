import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import {
    CREATE_POST_MUTATION,
    FETCH_POSTS_QUEST,
} from 'graphql/post';
import useForm from 'hooks/useForm';

const PostForm = () => {
    const { Input, Field } = Form;
    const { values, onChangeHandler, onSubmitHandler } = useForm(
        createNewPost,
        { body: '' },
    );

    const [createPost, { error }] = useMutation(
        CREATE_POST_MUTATION,
        {
            variables: values,
            update(cache, result) {
                const list = cache.readQuery({
                    query: FETCH_POSTS_QUEST,
                });
                cache.writeQuery({
                    query: FETCH_POSTS_QUEST,
                    data: {
                        getPosts: [
                            result.data.createPost,
                            ...list.getPosts,
                        ],
                    },
                });
            },
        },
    );

    function createNewPost() {
        createPost();
        values.body = '';
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <h2>Create a post:</h2>
            <Field>
                <Input
                    placeholder="Hi World"
                    name="body"
                    onChange={onChangeHandler}
                    value={values.body}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Field>
        </Form>
    );
};

export default PostForm;
