import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useCurrentUser } from '../../services/authService';
import styles from './HomePage.module.css'

const HomePage = () => {
    const welcomeRef = useRef<HTMLHeadingElement>(null);
    const userData = useCurrentUser();

    useEffect(() => {
        setTimeout(() => {
            welcomeRef.current?.classList.remove(styles.fadeIn);
            welcomeRef.current?.classList.add(styles.fadeOut);
        }, 2000);

        setTimeout(() => {
            if (welcomeRef.current) {
                welcomeRef.current.textContent = 'Welcome to my blog';
            }

            welcomeRef.current?.classList.remove(styles.fadeOut);
            welcomeRef.current?.classList.add(styles.fadeIn);

        }, 4000);

    }, [userData]);

    return (
        <header id="welcome" className="App-header">
            <h1 ref={welcomeRef} className={styles.fadeIn}>{userData?.isAuthenticated ? `Hi, ${userData.username}.` : 'Hi.'}</h1>
        </header>
    );




};

export default HomePage;