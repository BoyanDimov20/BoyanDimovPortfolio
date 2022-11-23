import { ChangeEvent, useRef } from 'react';
import { InputProperties } from './Input';
import styles from './Input.module.css';


export interface TextAreaProperties {
    value: string,
    placeholder: string,
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void,
    errorMessage?: string,
    rows?: number
};

const TextArea = ({ value, placeholder, onChange, errorMessage, rows }: TextAreaProperties) => {
    let classList = styles.textarea;

    if (errorMessage) {
        classList += ' ' + styles.inputError;
    }

    return (
        <>
            {errorMessage ?
                <div className={styles.errorMessage}>{errorMessage}</div>
                : <></>
            }
            <textarea rows={rows} className={classList} value={value} onChange={onChange} placeholder={placeholder} />
        </>
    );
};

export default TextArea;
