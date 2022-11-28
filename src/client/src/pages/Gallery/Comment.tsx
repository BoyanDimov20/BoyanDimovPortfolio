import React, { MouseEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './GalleryPage.module.css'
import $ from 'jquery';
import { debug } from 'console';

export interface CommentProperties {
    author: string,
    comment: string
};

const Comment = ({ author, comment }: CommentProperties) => {

    const [isOpened, setIsOpened] = useState(false);

    return (
        <div className={styles.commentBox}>
            <span onClick={() => setIsOpened(prev => !prev)} className={styles.editBtn}><i className="fa fa-ellipsis-v" aria-hidden="true"></i></span>

            {isOpened ?
                <div tabIndex={0} className={styles.editOptionsList}>
                    <div className={styles.editOptionsItem}>Edit</div>
                    <div className={styles.editOptionsItem}>Delete</div>
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