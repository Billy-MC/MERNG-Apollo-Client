import { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { CREATE_POST_MUTATION } from 'graphql/post';
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
        onError: err => setError(err.graphQLErrors[0].message),
        update(cache, result) {
            cache.modify({
                fields: {
                    getPosts(existingPosts = []) {
                        const newPostRef = cache.writeFragment({
                            data: result.data.createPost,
                            fragment: gql`
                                fragment NewPost on getPosts {
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
                            `,
                        });
                        return [newPostRef, ...existingPosts];
                    },
                },
            });
        },
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
                <Button type="submit" color="teal">
                    Submit
                </Button>
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
