import { MouseEvent, useState } from "react";
import Input, { ChangeInputEventHandler, InputProperties } from "../../components/Input/Input";
import styles from './Login.module.css'

type RegisterFormProperties = {
    close: () => void
}
const RegisterForm = ({ close }: RegisterFormProperties) => {
    const [usernameState, setUsernameState] = useState({
        value: '',
        placeholder: 'Username',
        type: 'text'

    } as InputProperties);

    const [nameState, setNameState] = useState({
        value: '',
        placeholder: 'Name',
        type: 'text'

    } as InputProperties);

    const [passwordState, setPasswordState] = useState({
        value: '',
        placeholder: 'Password',
        type: 'password'

    } as InputProperties);

    const submitRegister = (event : MouseEvent<HTMLButtonElement>) => {
        if (usernameState.value === '') {
            setUsernameState(prev => {
                const copy = { ...prev };
                copy.errorMessage = 'Полето е задължително';

                return copy;
            });
        }
        else if (passwordState.value === '') {
            setPasswordState(prev => {
                const copy = { ...prev };
                copy.errorMessage = 'Полето е задължително';

                return copy;
            });
        }

        if (usernameState.value && passwordState.value) {
            fetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    username: usernameState.value,
                    password: passwordState.value,
                    name: nameState.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then(x => {
                if (x.ok) {
                    close();
                }
            })

        }


    };
    return (
        <>
            <Input {...usernameState} onChange={(event) => ChangeInputEventHandler(event, setUsernameState)} />
            <Input {...nameState} onChange={(event) => ChangeInputEventHandler(event, setNameState)} />
            <Input {...passwordState} onChange={(event) => ChangeInputEventHandler(event, setPasswordState)} />
            <button type="button" onClick={submitRegister} className={styles.btn}>Register</button>
        </>
    );
};

export default RegisterForm;