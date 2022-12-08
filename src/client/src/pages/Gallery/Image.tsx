import { useState, ReactDOM, useEffect, useRef, KeyboardEvent, MouseEvent } from 'react';
import styles from './GalleryPage.module.css'
import Portal from '../../helpers/Portal';
import contactStyles from '../ContactPage/ContactPage.module.css';
import Comment, { CommentProperties } from './Comment';
import React from 'react';
import useDialogVisibility from './hooks/useDialog';
import { createSignalRContext } from 'react-signalr';

const { useSignalREffect, invoke } = createSignalRContext();

type ImageProperties = {
    src: string
};

type CommentType = {
    author: string,
    comment: string
};

const Image = ({ src }: ImageProperties) => {

    const [dialogOpened, setDialogOpened] = useDialogVisibility();
    const commentInputRef = useRef<HTMLInputElement>(null);


    const [comments, setComments] = useState([] as CommentType[]);

    const handleClick = () => {
        setDialogOpened(true);
    };



    const enterPressedHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13 &&
            commentInputRef.current == document.activeElement) {

            sendComment();
        }
    };

    const clickButtonHandler = (event: MouseEvent<HTMLSpanElement>) => {
        sendComment();
    }

    const sendComment = () => {
        if (commentInputRef.current &&
            commentInputRef.current.value != '') {

            const current = commentInputRef.current.value.slice();

            invoke('SendComment', current);
            /*
            setComments(prev => {
                const newComment = [...prev, { author: 'Boyan', comment: current }];
                if (commentInputRef.current)
                    commentInputRef.current.value = '';
                return newComment;
            });
            */

        }
    };

    const deleteComment = (comment: CommentType) => {
        setComments(prev => prev.filter(x => x != comment));
    };

    useSignalREffect('ReceiveComment', (comment: string) => {
        console.log(comment);
        setComments(prev => [...prev, { author: 'Boyan', comment: JSON.stringify(comment) }]);
    }, []);

    return (
        <>
            <img onClick={handleClick} className={styles.img} src={src} />
            {dialogOpened &&
                <Portal id="modal-root">
                    <div className={styles.modal}>
                        <span className={styles.close} onClick={() => setDialogOpened(false)}>&times;</span>
                        <img className={styles.modalImg} src={src} />
                        <div className={styles.commentSection} style={{ overflowX: comments.length >= 3 ? 'auto' : 'unset', minHeight: comments.length >= 3 ? '50%' : 'unset' }}>
                            <Comment onDeleteComment={() => console.log('Deleted')} author="Boyan" comment="Haha :D" />
                            {comments.map((x, i) =>
                                <Comment onDeleteComment={() => deleteComment(x)} key={i} author={x.author} comment={x.comment} />
                            )}
                            <div className={styles.btnContainer}>
                                <input ref={commentInputRef} onKeyDown={enterPressedHandler} className={styles.input} placeholder="Write your comment.." type="text" />
                                <span onClick={clickButtonHandler} className={styles.sendBtn}>
                                    <i className="fa fa-paper-plane" style={{ color: '#3ea6ff' }} aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </Portal>
            }
        </>
    );
};

export default Image;