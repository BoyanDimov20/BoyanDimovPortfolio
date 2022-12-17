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
import { queryConfig } from '../../services/queries';

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
                    queryClient.invalidateQueries(queryConfig.getCurrentUser.queryKey);
                    queryClient.invalidateQueries(queryConfig.getCommentByImageId.invalidationQueryKey);
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
        if (!fileUpload.current?.files?.length) {
            return;
        }

        Swal.fire({
            title: 'Meme title?:',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Upload',
            showLoaderOnConfirm: true,
            preConfirm: (title) => {
                if (!fileUpload.current?.files?.length) {
                    return;
                }
                var data = new FormData();

                data.append('file', fileUpload.current?.files[0]);
                data.append('title', title);

                return fetch('/api/image', {
                    method: 'POST',
                    credentials: 'include',
                    body: data
                }).then(x => {
                    if (x.ok) {
                        queryClient.invalidateQueries(queryConfig.getImages.queryKey);

                        Swal.fire({
                            title: 'Good job!',
                            text: 'Meme uploaded successfully!',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        if(fileUpload.current)
                            fileUpload.current.value = '';
                    }
                }).catch(err => {

                    Swal.showValidationMessage(
                        `Request failed: ${err}`
                    )
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
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
            <input ref={fileUpload} onInput={submitImage} type="file" accept='image/*' hidden></input>

        </section>
    );
};


export default Navigation;