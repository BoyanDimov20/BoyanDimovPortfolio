import React, { DragEvent, DragEventHandler, useState } from 'react';
import Swal from 'sweetalert2';
import { useImages } from '../../services/galleryService';
import styles from './GalleryPage.module.css'
import Image from './Image';

const GalleryPage = () => {

    const images = useImages();
    const [draggedItem, setDraggedItem] = useState<string>();
    const [showDeleteIcon, setDeleteIcon] = useState(false);
    const dragOverHandler = (event: DragEvent<HTMLSpanElement>) => {
        event.preventDefault();
    };

    const onDragStart = (event: React.DragEvent<HTMLImageElement>, id: string) => {
        setDeleteIcon(true);
        setDraggedItem(id);
        //@ts-ignore
        event.target.style.opacity = '0.2';
        document.body.style.opacity = '0.8';
    };

    const onDragEnd = (event: React.DragEvent<HTMLImageElement>) => {
        //@ts-ignore
        event.target.style.opacity = '';
        document.body.style.opacity = '';
        setDeleteIcon(false);
    };

    const onDrop = (event: DragEvent<HTMLSpanElement>) => {
        event.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You will delete this meme!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your meme has been deleted.',
                    'success'
                );
                console.log('Deleted: ' + draggedItem);
            }
            setDraggedItem('');
        })
    };

    return (
        <section id="gallery" className="section">
            <div className={styles.gallery}>
                {images?.map(x =>
                    <Image onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event, x.id)} key={x.id} id={x.id} src={x.url} />
                )}
            </div>
            {showDeleteIcon ?
                <span onDrop={onDrop} onDragOver={dragOverHandler} style={{ position: 'fixed', bottom: '10px', color: 'red' }}>
                    <i style={{ fontSize: 36 }} className="fa fa-trash" aria-hidden="true"></i>
                </span>
                : <></>}
        </section>
    );
};

export default GalleryPage;