import { MouseEvent, useState } from "react";
import { useQueryClient } from "react-query";
import Swal from "sweetalert2";
import Input, { ChangeInputEventHandler, InputProperties } from "../../components/Input/Input";
import styles from './Login.module.css';

type LoginFormProperties = {
    close: () => void
}

const LoginForm = ({ close }: LoginFormProperties) => {
    const queryClient = useQueryClient();

    const [usernameState, setUsernameState] = useState({
        value: '',
        placeholder: 'Username',
        type: 'text'

    } as InputProperties);

    const [passwordState, setPasswordState] = useState({
        value: '',
        placeholder: 'Password',
        type: 'password'

    } as InputProperties);

    const loginHandler = (event: MouseEvent<HTMLButtonElement>) => {

        // Validations
        if (usernameState.value === '') {
            setUsernameState(prev => {
                const copy = { ...prev };
                prev.errorMessage = 'Полето е задължително';

                return copy;
            });
            return;
        }
        if (passwordState.value === '') {
            setPasswordState(prev => {
                const copy = { ...prev };
                prev.errorMessage = 'Полето е задължително';

                return copy;
            });
            return;
        }


        fetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: usernameState.value,
                password: passwordState.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(x => {
            if (x.ok) {
                close();
                queryClient.invalidateQueries('me');
                queryClient.invalidateQueries({
                    queryKey: [, , 'auth']
                });

                Swal.fire({
                    title: 'Good job!',
                    text: 'Authenticated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                setPasswordState(prev => {
                    const copy = { ...prev };

                    copy.errorMessage = 'Грешна парола';
                    return copy;
                });
            }
        });
    };

    return (
        <>
            <Input onChange={(event) => ChangeInputEventHandler(event, setUsernameState)} {...usernameState} />
            <Input onChange={(event) => ChangeInputEventHandler(event, setPasswordState)} {...passwordState} />
            <button onClick={loginHandler} type="button" className={styles.btn}>Login</button>
        </>
    );
};

export default LoginForm;