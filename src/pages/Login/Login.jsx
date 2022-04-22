import { useState, useContext } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from 'store/auth-context';
import useForm from 'hooks/useForm';
import { LOGIN_USER } from 'graphql/user';
import styles from './Login.module.css';

const initialInput = {
    username: '',
    password: '',
};

const Login = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const { Input } = Form;
    const [errors, setErrors] = useState({});
    const { onChangeHandler, onSubmitHandler, values } = useForm(
        registerUser,
        initialInput,
    );

    const [addUser, { loading }] = useMutation(LOGIN_USER, {
        update(cache, result) {
            const {
                data: { login: user },
            } = result;
            authCtx.onLogin(user);
            navigate('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values,
    });

    function registerUser() {
        addUser();
    }
    return (
        <div className={styles['form-container']}>
            <Form
                onSubmit={onSubmitHandler}
                noValidate
                className={loading ? 'loading' : ''}
            >
                <h1>Login</h1>
                <Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={onChangeHandler}
                    // errors.username? true : false === !!errors.username
                    error={!!errors.username}
                />
                <Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={onChangeHandler}
                    error={!!errors.password}
                />
                <Button type="submit" primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <Message
                    negative
                    header="Error!"
                    list={Object.values(errors)}
                />
            )}
        </div>
    );
};

export default Login;
