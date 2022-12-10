import React, { MouseEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './GalleryPage.module.css'

export interface CommentProperties {
    author: string,
    comment: string,
    onDeleteComment: () => void,
    isEditable: boolean
};

const Comment = ({ author, comment, onDeleteComment, isEditable }: CommentProperties) => {

    const [isOpened, setIsOpened] = useState(false);
    const commentBoxRef = useRef<HTMLDivElement>(null);

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
                    <div className={styles.editOptionsItem}>Edit</div>
                    <div onClick={() => deleteComment()} className={styles.editOptionsItem}>Delete</div>
                </div>
                : <></>
            }

            <div className={styles.author}>
                {author}:
            </div>
            <div className={styles.comment}>
                {comment}
            </div>
        </div>
    );
}

export default Comment;