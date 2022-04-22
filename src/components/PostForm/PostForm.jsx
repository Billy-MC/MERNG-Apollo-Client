import { Button, Form } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { CREATE_POST_MUTATION } from 'graphql/post';
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
