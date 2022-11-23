import { useEffect, useRef } from 'react';
import styles from './MainPage.module.css'
import Icon from './Icon';
import React from 'react';

const MainPage = () => {
    const listRef = useRef<HTMLUListElement>(null);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            const topBorder = document
                .getElementById("navbar-container")
                ?.getBoundingClientRect().top;

            if (topBorder && topBorder < 0) {
                var intervalTime = 1000;
                if(listRef.current) {
                    [...listRef.current.children].forEach(el => {
                        setTimeout(() => {
                            (el as HTMLElement).style.display = 'flex';
                            
                        }, intervalTime);
    
                        intervalTime += 500;
                    });
                }
                
            }
        });

    }, []);
    return (
        <section className='section' id="aboutMe">
            <div style={{ margin: 'auto' }}>
                <ul ref={listRef} className={styles.checkList}>
                    <li>Studying Information Technologies in New Bulgarian University <Icon className={styles.mobileIcon} src="nbu-logo.jpg" /></li>
                    <li>Working as a Full-Stack Web Developer </li>
                    <li>Web enthusiast 👨🏽‍💻</li>
                    <li><Icon src="cs-logo.jpg" /> & <Icon src="js-logo.png" /> lover ❤</li>
                </ul>
            </div>
        </section>
    );
};

export default MainPage;