import styles from './ContactPage.module.css'

const ContactPage = () => {


    return (
        <section className={styles.section} id="contact">
            
            <div className={styles.form}>
                <h1 className={styles.title}>Contact Me</h1>
                <input className={styles.input} placeholder="Email" type="text" />
                <input className={styles.input} placeholder="Subject" type="text" />
                <textarea rows={6} className={styles.textarea} placeholder="Write your email.." />
                <button className={styles.btn} type="text">Send</button>
            </div>
        </section>
    );
};

export default ContactPage;