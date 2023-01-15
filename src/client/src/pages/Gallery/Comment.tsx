import React, { KeyboardEvent, MouseEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import Input from '../../components/Input/Input';
import { queryConfig } from '../../services/queries';
import styles from './GalleryPage.module.css';

export interface CommentProperties {
    author: string,
    comment: string,
    onDeleteComment: () => void,
    isEditable: boolean,
    id: string
};

const Comment = ({ author, comment, onDeleteComment, isEditable, id }: CommentProperties) => {

    const [isOpened, setIsOpened] = useState(false);
    const commentBoxRef = useRef<HTMLDivElement>(null);

    const [isOpenForEdit, setIsOpenForEdit] = useState(false);
    const [newComment, setNewComment] = useState('');
    const queryClient = useQueryClient();

    const editComment = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter' && newComment !== comment && newComment !== '') {

            const response = await fetch(queryConfig.editCommentById.url(), {
                credentials: 'include',
                method: queryConfig.editCommentById.method,
                body: JSON.stringify({
                    id: id,
                    commentValue: newComment
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                queryClient.invalidateQueries(queryConfig.editCommentById.invalidationQueryKey);
                setIsOpenForEdit(false);
            }
        }
        else if(event.key == 'Esc' || event.key == 'Escape') {
            setIsOpenForEdit(false);
        }
    };


    const openForEdit = () => {
        setNewComment(comment);
        setIsOpenForEdit(true);
        setIsOpened(false);
    };

    const deleteComment = () => {

        setIsOpened(false);
        if (commentBoxRef.current)
            commentBoxRef.current.className = styles.commentBoxFadeOut;

        onDeleteComment();


    };

    return (
        <div ref={commentBoxRef} className={styles.commentBox}>
            {isEditable ?
                <span onClick={() => setIsOpened(prev => !prev)} className={styles.editBtn}><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>
                : <></>
            }

            {isOpened ?
                <div tabIndex={0} className={styles.editOptionsList}>
                    <div onClick={() => openForEdit()} className={styles.editOptionsItem}>Edit</div>
                    <div onClick={() => deleteComment()} className={styles.editOptionsItem}>Delete</div>
                </div>
                : <></>
            }

            <div className={styles.author}>
                {author}:
            </div>
            {!isOpenForEdit ?
                <div className={styles.comment}>
                    {comment}
                </div>
                : <input onKeyDown={editComment} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            }

        </div>
    );
}

export default Comment;