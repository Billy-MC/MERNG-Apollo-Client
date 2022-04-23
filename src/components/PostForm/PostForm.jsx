import { useState } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import {
    CREATE_POST_MUTATION,
    FETCH_POSTS_QUERY,
} from 'graphql/post';
import useForm from 'hooks/useForm';

const PostForm = () => {
    const [error, setError] = useState(null);
    const { Input, Field } = Form;
    const { Header } = Message;
    const { values, onChangeHandler, onSubmitHandler } = useForm(
        createNewPost,
        { body: '' },
    );

    const [createPost] = useMutation(CREATE_POST_MUTATION, {
        variables: values,

        update(cache, result) {
            const list = cache.readQuery({
                query: FETCH_POSTS_QUERY,
            });
            cache.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [
                        result.data.createPost,
                        ...list.getPosts,
                    ],
                },
            });
        },
        onError: err => setError(err.graphQLErrors[0].message),
    });

    function createNewPost() {
        createPost();
        values.body = '';
        setError(null);
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
                    error={!!error}
                />
                <button type="submit" className="ui button teal">
                    Submit
                </button>
            </Field>
            {error && (
                <Message negative style={{ marginBottom: 20 }}>
                    <Header>Error</Header>
                    <li>{error}</li>
                </Message>
            )}
        </Form>
    );
};

export default PostForm;
