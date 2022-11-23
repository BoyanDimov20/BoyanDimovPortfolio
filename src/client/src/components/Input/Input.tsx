import { ChangeEvent, useState } from "react";
import styles from './Input.module.css';

export interface InputProperties {
    value: string,
    placeholder: string,
    type: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    errorMessage?: string
};

const Input = ({ value, placeholder, type, onChange, errorMessage }: InputProperties) => {

    let className = styles.input;

    if (errorMessage) {
        className += ' ' + styles.inputError;
    }

    return (
        <>
            {errorMessage ?
                <div className={styles.errorMessage}>{errorMessage}</div>
                : <></>
            }
            <input className={className} value={value} onChange={onChange} placeholder={placeholder} type={type} />
        </>
    );
};

export default Input;