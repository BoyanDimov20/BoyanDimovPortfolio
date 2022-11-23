import styles from './GalleryPage.module.css'


const Comment = ({ author, comment }) => {
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