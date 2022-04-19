import { useState } from 'react';

const useForm = (cb, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChangeHandler = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        cb();
    };
    return {
        onChangeHandler,
        onSubmitHandler,
        values,
    };
};

export default useForm;
