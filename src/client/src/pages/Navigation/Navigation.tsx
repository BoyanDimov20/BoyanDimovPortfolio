import { MouseEvent, useRef, useState } from 'react';
import styles from './Navigation.module.css'
import $ from "jquery";
import navLinks from './constants';
import React from 'react';
import Portal from '../../helpers/Portal';
import Login from '../LoginPage/Login';
import { useCurrentUser } from '../../services/authService';
import { useQueryClient } from 'react-query';
import Swal from 'sweetalert2';

const Navigation = () => {
    const [navOpened, setNavOpened] = useState(false);
    const [loginOpened, setLoginOpened] = useState(false);
    const userData = useCurrentUser();
    const queryClient = useQueryClient();

    const fileUpload = useRef<HTMLInputElement>(null);

    const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
        event.preventDefault();
        if (navOpened) {
            setNavOpened(false);
        }

        const offsetTop = (document.querySelector(href) as HTMLElement).offsetTop;
        $('html, body').stop().animate({ scrollTop: offsetTop }, 1500);
    }

    const openLoginModal = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        if (navOpened) {
            setNavOpened(false);
        }

        setLoginOpened(true);
    };

    const logoutHandler = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        if (navOpened) {
            setNavOpened(false);
        }

        fetch('/auth/logout')
            .then(x => {
                if (x.ok) {
                    queryClient.invalidateQueries('me');
                    queryClient.invalidateQueries('auth');
                }
            });
    };

    const uploadImage = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if (navOpened) {
            setNavOpened(false);
        }

        fileUpload.current?.click();
    };

    const submitImage = () => {
        debugger;
        if (!fileUpload.current?.files?.length) {
            return;
        }

        var data = new FormData();

        data.append('file', fileUpload.current?.files[0]);
        fetch('/api/image', {
            method: 'POST',
            credentials: 'include',
            body: data
        }).then(x => {
            if (x.ok) {
                console.log('lol')
                queryClient.invalidateQueries('images');
                Swal.fire({
                    title: 'Good job!',
                    text: 'Meme uploaded successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });

    };

    return (
        <section id="navbar-container">
            {!loginOpened &&
                <>
                    <ul className={styles.desktopNav} id="nav">
                        {navLinks.map(link =>
                            <li key={link.href}><a onClick={(event) => navigate(event, link.href)} href={link.href}>{link.title}</a></li>
                        )}

                        <div style={{ display: 'flex', marginLeft: 'auto' }}>
                            {userData?.isAuthenticated ?
                                <li>
                                    <a onClick={uploadImage} href="#">Upload</a>
                                </li>
                                : null
                            }
                            {!userData?.isAuthenticated ?
                                <li><a onClick={openLoginModal} href="#">Login</a></li>
                                : <li><a onClick={logoutHandler} href="#">Logout</a></li>
                            }
                        </div>

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
                                {!userData?.isAuthenticated ?
                                    <a onClick={openLoginModal} href="#">Login</a>
                                    : <a onClick={logoutHandler} href="#">Logout</a>
                                }
                            </div>
                        }
                    </div>
                </>
            }
            {loginOpened ?
                <Portal id="modal-root">
                    <Login onClose={() => setLoginOpened(false)} />
                </Portal>
                : null
            }
            <input ref={fileUpload} onChange={submitImage} type="file" accept='image/*' hidden></input>

        </section>
    );
};


export default Navigation;