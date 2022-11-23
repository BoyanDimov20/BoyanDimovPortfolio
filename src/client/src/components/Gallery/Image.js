import { useState, ReactDOM, useEffect, useRef } from 'react';
import styles from './GalleryPage.module.css'
import Portal from './helpers/Portal';
import contactStyles from '../ContactPage/ContactPage.module.css';
import Comment from './Comment';

const Image = ({ src }) => {

    const [dialogOpened, setDialogOpened] = useState(false);
    const commentInputRef = useRef(null);


    const [comments, setComments] = useState([]);

    const handleClick = () => {
        setDialogOpened(true);
    };

    useEffect(() => {
        const navigation = document.getElementById('nav');
        if (dialogOpened) {
            navigation.style.display = 'none';
        } else {
            navigation.style.display = '';
        }
    }, [dialogOpened]);

    const enterPressedHandler = (event) => {
        if (event.keyCode === 13 &&
            commentInputRef.current == document.activeElement &&
            commentInputRef.current.value != '') {

            const current = commentInputRef.current.value.slice();
            setComments(prev => {
                const newComment = [...prev, { author: 'Boyan', comment: current }];
                commentInputRef.current.value = '';
                return newComment;
            });
        }
    };
    return (
        <>
            <img onClick={handleClick} className={styles.img} src={src} />
            {dialogOpened &&
                <Portal id="modal-root">
                    <div className={styles.modal}>
                        <span className={styles.close} onClick={() => setDialogOpened(false)}>&times;</span>
                        <img className={styles.modalImg} src={src} />
                        <div className={styles.commentSection} style={{overflowX: comments.length >= 3 ? 'auto': 'unset', minHeight: comments.length >= 3 ? '50%': 'unset'}}>
                            <Comment author="Boyan" comment="Haha :D" />
                            {comments.map((x, i) =>
                                <Comment key={i} author={x.author} comment={x.comment} />
                            )}
                            <input ref={commentInputRef} onKeyDown={enterPressedHandler} className={styles.input} placeholder="Write your comment.." type="text" />
                        </div>
                    </div>
                </Portal>
            }
        </>
    );
};

export default Image;