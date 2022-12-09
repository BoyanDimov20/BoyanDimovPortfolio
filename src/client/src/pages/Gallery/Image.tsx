import { useState, ReactDOM, useEffect, useRef, KeyboardEvent, MouseEvent } from 'react';
import styles from './GalleryPage.module.css'
import Portal from '../../helpers/Portal';
import contactStyles from '../ContactPage/ContactPage.module.css';
import Comment, { CommentProperties } from './Comment';
import React from 'react';
import useDialogVisibility from './hooks/useDialog';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';
import { LogLevel } from '@microsoft/signalr/dist/esm/ILogger';
import useHubConnection from './hooks/useHubConnection';
import useListenHubConnection from './hooks/useListenHubConnection';
import { CommentServiceProperties, useComments } from '../../services/commentService';

type ImageProperties = {
    src: string,
    id: string
};

const Image = ({ src, id }: ImageProperties) => {

    const [dialogOpened, setDialogOpened] = useDialogVisibility();
    const commentInputRef = useRef<HTMLInputElement>(null);


    const comments = useComments(id);
    const [hubComments, setHubComments] = useState<CommentServiceProperties[]>([]);

    const connection = useHubConnection('commentHub', (connectionBuilder) => {
        connectionBuilder.invoke('ConnectComment', id);
        console.log('Connected to group');
    });

    useListenHubConnection(connection, 'ReceiveComment', (comment: string, commentId: string, username: string) => {
        setHubComments(prev => {
            const newComment = [...prev, { id: commentId, content: comment, username: username, isEditable: false }];
            if (commentInputRef.current)
                commentInputRef.current.value = '';
            return newComment;
        });
    });

    const enterPressedHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13 &&
            commentInputRef.current == document.activeElement) {

            sendComment();
        }
    };

    const sendComment = () => {
        if (commentInputRef.current &&
            commentInputRef.current.value != '') {

            const current = commentInputRef.current.value.slice();

            if (current) {
                fetch('/api/comment', {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({
                        imageId: id,
                        content: current
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(async (x) => {
                    if (x.ok) {
                        if (commentInputRef.current)
                            commentInputRef.current.value = '';

                        const result = await x.json();

                        connection?.invoke('SendComment', id, current, result.commentId, result.username);
                    }
                });
            }
        }
    };

    const deleteComment = (commentId: string) => {
        //TODO
    };


    return (
        <>
            <img onClick={() => setDialogOpened(true)} className={styles.img} src={src} />
            {dialogOpened &&
                <Portal id="modal-root">
                    <div className={styles.modal}>
                        <span className={styles.close} onClick={() => setDialogOpened(false)}>&times;</span>
                        <img className={styles.modalImg} src={src} />
                        <div className={styles.commentSection} style={{ overflowX: comments?.length >= 3 ? 'auto' : 'unset', minHeight: comments?.length >= 3 ? '50%' : 'unset' }}>
                            {comments?.map((x) =>
                                <Comment isEditable={x.isEditable} onDeleteComment={() => deleteComment(x.id)} key={x.id} author={x.username} comment={x.content} />
                            )}
                            {hubComments?.map((x) =>
                                <Comment isEditable={x.isEditable} onDeleteComment={() => deleteComment(x.id)} key={x.id} author={x.username} comment={x.content} />
                            )}
                            <div className={styles.btnContainer}>
                                <input ref={commentInputRef} onKeyDown={enterPressedHandler} className={styles.input} placeholder="Write your comment.." type="text" />
                                <span onClick={() => sendComment()} className={styles.sendBtn}>
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