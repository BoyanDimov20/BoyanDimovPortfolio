import { useEffect, useRef, useState } from 'react';
import styles from './Navigation.module.css'
import $ from "jquery";
import navLinks from './constants';

const Navigation = () => {

    useEffect(() => {
        window.addEventListener("scroll", () => {
            const topBorder = document
                .getElementById("navbar-container")
                .getBoundingClientRect().top;

            if (topBorder >= 0) {
                document.getElementById('nav').classList.remove(styles.fixed);
            } else {
                document.getElementById('nav').classList.add(styles.fixed);
            }

        });
    }, []);

    const navigate = (event, href) => {
        event.preventDefault();
        const offsetTop = document.querySelector(href).offsetTop;
        $('html, body').stop().animate({ scrollTop: offsetTop }, 1500);
    }
    return (
        <section id="navbar-container">
            <ul id="nav">
                {navLinks.map(link =>
                    <li key={link.href}><a onClick={(event) => navigate(event, link.href)} href={link.href}>{link.title}</a></li>
                )}
            </ul>
        </section>
    );
};


export default Navigation;