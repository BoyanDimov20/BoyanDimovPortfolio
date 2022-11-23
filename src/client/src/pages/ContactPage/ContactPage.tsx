import styles from './ContactPage.module.css';
import Swal from 'sweetalert2';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import React from 'react';
import Input, { InputProperties } from '../../components/Input/Input';
import TextArea, { TextAreaProperties } from '../../components/Input/TextArea';



const ContactPage = () => {

    const [emailState, setEmailState] = useState<InputProperties>({
        value: '',
        placeholder: 'Email',
        type: 'email'
    });

    const [subjectState, setSubjectState] = useState<InputProperties>({
        value: '',
        placeholder: 'Subject',
        type: 'text'
    });

    const [contentState, setContentState] = useState<TextAreaProperties>({
        value: '',
        placeholder: 'Write your email..',
        rows: 6
    });

    const changeInputHandler = (event: ChangeEvent<HTMLInputElement>, stateFunction: Dispatch<SetStateAction<InputProperties>> ) => {
        stateFunction(prev => {
            const copy = { ...prev };
            copy.value = event.target.value;
            copy.errorMessage = '';

            return copy;
        });
    };

    const changeTextAreaHandler = (event: ChangeEvent<HTMLTextAreaElement>, stateFunction: Dispatch<SetStateAction<TextAreaProperties>> ) => {
        stateFunction(prev => {
            const copy = { ...prev };
            copy.value = event.target.value;
            copy.errorMessage = '';

            return copy;
        });
    };

    const sendMessage = () => {
        if (emailState.value == '') {

            setEmailState(prev => {
                const copy = { ...prev };
                copy.errorMessage = 'Полето е задължително';

                return copy;
            });
        } else if (subjectState.value == '') {

            setSubjectState(prev => {
                const copy = { ...prev };
                copy.errorMessage = 'Полето е задължително';

                return copy;
            });
        } else if (contentState.value == '') {
            setContentState(prev => {
                const copy = { ...prev };
                copy.errorMessage = 'Полето е задължително';

                return copy;
            });
        }

        if (emailState.value != '' && subjectState.value != '' && contentState.value != '') {

            Swal.fire({
                title: 'Good job!',
                text: 'Your email was sent successfully.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <section className={styles.section} id="contact">
            <div className={styles.form}>
                <h1 className={styles.title}>Contact Me</h1>
                <Input {...emailState} onChange={(event) => changeInputHandler(event, setEmailState)} />
                <Input {...subjectState} onChange={(event) => changeInputHandler(event, setSubjectState)} />
                <TextArea {...contentState} onChange={(event) => changeTextAreaHandler(event, setContentState)} />
                <button className={styles.btn} type="button" onClick={sendMessage}>Send</button>
            </div>
        </section>
    );
};

export default ContactPage;