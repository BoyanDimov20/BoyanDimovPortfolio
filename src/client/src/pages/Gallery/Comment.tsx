import React from 'react';
import styles from './GalleryPage.module.css'

export interface CommentProperties {
    author: string,
    comment: string
};

const Comment = ({ author, comment }: CommentProperties) => {
    return (
        <div className={styles.commentBox}>
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