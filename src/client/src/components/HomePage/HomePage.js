import { useEffect, useRef, useState } from 'react';
import styles from './HomePage.module.css'

const HomePage = () => {
    const welcomeRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            welcomeRef.current.classList.remove(styles.fadeIn);
            welcomeRef.current.classList.add(styles.fadeOut);
        }, 2000);

        setTimeout(() => {
            welcomeRef.current.textContent = 'Welcome to my blog';
            welcomeRef.current.classList.remove(styles.fadeOut);
            welcomeRef.current.classList.add(styles.fadeIn);
            
        }, 4000);
       
    }, []);
    return (
        <header id="welcome" className="App-header">
            <h1 ref={welcomeRef} className={styles.fadeIn}>Hi.</h1>
        </header>
    );
};

export default HomePage;