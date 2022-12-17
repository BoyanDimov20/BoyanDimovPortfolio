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
import { useQueryClient } from 'react-query';
import { queryConfig } from '../../services/queries';
import { useCurrentUser } from '../../services/authService';

type ImageProperties = {
    src: string,
    id: string,
    author: string,
    title: string,
    onDragStart: (event: React.DragEvent<HTMLImageElement>) => void,
    onDragEnd: (event: React.DragEvent<HTMLImageElement>) => void
};

const Image = ({ src, id, author, title, onDragStart, onDragEnd }: ImageProperties) => {

    const [dialogOpened, setDialogOpened] = useDialogVisibility();
    const commentInputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const currentUser = useCurrentUser();

    const comments = useComments(id);

    const connection = useHubConnection('commentHub', (connectionBuilder) => {
        connectionBuilder.invoke('ConnectComment', id);
    });

    useListenHubConnection(connection, 'NewComment', () => {
        queryClient.invalidateQueries(queryConfig.getCommentByImageId.queryKey(id));
    });

    const enterPressedHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' &&
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

                        connection?.invoke('SendComment', id);
                    }
                });
            }
        }
    };

    const deleteComment = (commentId: string) => {
        fetch(`/api/comment?id=${commentId}`, {
            credentials: 'include',
            method: 'DELETE'
        }).then(x => {
            if (x.ok) {
                connection?.invoke('SendComment', id);
            }
        })
    };


    return (
        <>
            <div className={styles.img}>
                <img draggable onDragEnd={onDragEnd} onDragStart={onDragStart} onClick={() => setDialogOpened(true)} className={styles.img} src={src} />
                <div className={styles.description}>
                    <div className={styles.title}>{title}</div>
                    <div>Author: {author}</div>
                </div>
            </div>

            {dialogOpened &&
                <Portal id="modal-root">
                    <div className={styles.modal}>
                        <span className={styles.close} onClick={() => setDialogOpened(false)}>&times;</span>
                        <img className={styles.modalImg} src={src} />
                        <div className={styles.commentSection} style={{ overflowX: comments?.length >= 3 ? 'auto' : 'unset', minHeight: comments?.length >= 3 ? '50%' : 'unset' }}>
                            <h3 className={styles.commentHeading}>Остави коментар</h3>
                            {comments?.map((x) =>
                                <Comment isEditable={x.isEditable} onDeleteComment={() => deleteComment(x.id)} key={x.id} author={x.name} comment={x.content} />
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