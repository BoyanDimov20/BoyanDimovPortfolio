import { useState } from 'react';
import Input, { InputProperties } from '../../components/Input/Input';
import styles from './Login.module.css'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


type LoginProperties = {
    onClose: () => void
}
const Login = ({ onClose }: LoginProperties) => {

    const [showRegister, setShowRegister] = useState(false);

    return (
        <div className={styles.modal}>
            <form className={styles.form}>
                <span onClick={() => onClose()} className={styles.close}>&times;</span>
                <div className={styles.switch}>
                    <div className={styles.switchBtn} onClick={() => setShowRegister(false)} style={{ backgroundColor: showRegister ? '#d2d8d8' : '' }}>Login</div>
                    <div className={styles.switchBtn} onClick={() => setShowRegister(true)} style={{ backgroundColor: !showRegister ? '#d2d8d8' : '' }}>Register</div>
                </div>
                {showRegister ?
                    <RegisterForm close={() => onClose()} />
                    : <LoginForm close={() => onClose()} />
                }
            </form>
        </div>
    );
};

export default Login;