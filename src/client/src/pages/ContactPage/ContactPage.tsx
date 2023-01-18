import styles from './ContactPage.module.css';
import Swal from 'sweetalert2';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import React from 'react';
import Input, { ChangeInputEventHandler, InputProperties } from '../../components/Input/Input';
import TextArea, { ChangeTextAreaEventHandler, TextAreaProperties } from '../../components/Input/TextArea';



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



    const clearField = (stateFunction: Dispatch<SetStateAction<any>>) => {
        stateFunction((prev: any) => {
            const copy = { ...prev };
            copy.value = '';

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
            fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify({
                    email: emailState.value,
                    subject: subjectState.value,
                    content: contentState.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then(x => {
                if (x.ok) {
                    clearField(setEmailState);
                    clearField(setSubjectState);
                    clearField(setContentState);

                    Swal.fire({
                        title: 'Good job!',
                        text: 'Your email was sent successfully.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (x.status == 400) {
                    
                    x.text().then(text => {
                        Swal.fire({
                            title: 'Failed!',
                            text: text,
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });

                }
            })

        }
    };

    return (
        <section className={styles.section} id="contact">
            <div className={styles.form}>
                <h1 className={styles.title}>Contact Me</h1>
                <Input {...emailState} onChange={(event) => ChangeInputEventHandler(event, setEmailState)} />
                <Input {...subjectState} onChange={(event) => ChangeInputEventHandler(event, setSubjectState)} />
                <TextArea {...contentState} onChange={(event) => ChangeTextAreaEventHandler(event, setContentState)} />
                <button className={styles.btn} type="button" onClick={sendMessage}>Send</button>
            </div>
        </section>
    );
};

export default ContactPage;