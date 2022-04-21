import { useState, useContext } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'store/auth-context';
import useForm from 'hooks/useForm';
import styles from './Register.module.css';

const initialInput = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

const Register = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const { Input } = Form;
    const [errors, setErrors] = useState({});
    const { onChangeHandler, onSubmitHandler, values } = useForm(
        registerUser,
        initialInput,
    );

    const [addUser] = useMutation(REGISTER_USER, {
        update(_, result) {
            const {
                data: { register: user },
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
            <Form onSubmit={onSubmitHandler} noValidate>
                <h1>Register</h1>
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
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="text"
                    value={values.email}
                    onChange={onChangeHandler}
                    error={!!errors.email}
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
                <Input
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={onChangeHandler}
                    error={!!errors.confirmPassword}
                />
                <Button type="submit" primary>
                    Register
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

export default Register;
