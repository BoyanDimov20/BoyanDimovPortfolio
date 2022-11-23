import styles from './ContactPage.module.css'
import Swal from 'sweetalert2'
import { useState } from 'react';

const ContactPage = () => {

    const [email, setEmail] = useState('');
    const [emailState, setEmailState] = useState({
        className: styles.input
    });
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const sendMessage = () => {
        if (email == '') {
            
            setEmailState(prev => {
                const copy = { ...prev };
                copy.className += ' ' + styles.inputError;

                return copy;
            });
        }

        if (email != '' && subject != '' && content != '') {

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
                <input className={emailState.className} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
                <input className={styles.input} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" type="text" />
                <textarea rows={6} className={styles.textarea} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your email.." />
                <button className={styles.btn} type="text" onClick={sendMessage}>Send</button>
            </div>
        </section>
    );
};

export default ContactPage;