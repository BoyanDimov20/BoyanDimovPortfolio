import { MouseEvent, useState } from 'react';
import styles from './Navigation.module.css'
import $ from "jquery";
import navLinks from './constants';
import React from 'react';

const Navigation = () => {
    const [navOpened, setNavOpened] = useState(false);

    const navigate = (event : MouseEvent<HTMLAnchorElement>, href : string) => {
        event.preventDefault();
        if (navOpened) {
            setNavOpened(false);
        }
        const offsetTop = (document.querySelector(href) as HTMLElement).offsetTop;
        $('html, body').stop().animate({ scrollTop: offsetTop }, 1500);
    }
    
    return (
        <section id="navbar-container">
            <ul className={styles.desktopNav + ' ' + styles.fixed} id="nav">
                {navLinks.map(link =>
                    <li key={link.href}><a onClick={(event) => navigate(event, link.href)} href={link.href}>{link.title}</a></li>
                )}
            </ul>
            
            <div className={styles.mobileNav}>
                <a className={styles.navBtn} onClick={() => setNavOpened(prev => !prev)}>
                    <i className="fa fa-bars"></i>
                </a>
                {navOpened &&
                    <div id="myLinks">
                        {navLinks.map(link =>
                            <a key={link.href} onClick={(event) => navigate(event, link.href)} href={link.href}>{link.title}</a>
                        )}
                    </div>
                }
            </div>
        </section>
    );
};


export default Navigation;