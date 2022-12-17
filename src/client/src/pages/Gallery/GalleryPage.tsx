import React, { DragEvent, DragEventHandler, useState } from 'react';
import { useQueryClient } from 'react-query';
import Swal from 'sweetalert2';
import { useImages } from '../../services/galleryService';
import { queryConfig } from '../../services/queries';
import styles from './GalleryPage.module.css'
import Image from './Image';

const GalleryPage = () => {

    const images = useImages();
    const queryClient = useQueryClient();
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

        }).then(async (result) => {

            if (result.isConfirmed) {

                const response = await fetch(`/api/image?id=${draggedItem}`, {
                    credentials: 'include',
                    method: 'DELETE'
                });

                if (response.ok) {
                    queryClient.invalidateQueries(queryConfig.getImages.queryKey);

                    Swal.fire(
                        'Deleted!',
                        'Your meme has been deleted.',
                        'success'
                    );
                }
                else if (response.status === 401) {
                    Swal.fire(
                        'Unauthorized!',
                        'You are not the owner of this meme.',
                        'error'
                    );
                }

            }
            setDraggedItem('');
        });
    };

    return (
        <section id="gallery" className="section">
            <div className={styles.gallery}>
                {images?.map(x =>
                    <Image onDragEnd={onDragEnd} onDragStart={(event) => onDragStart(event, x.id)} key={x.id} id={x.id} src={x.url} title={x.title} author={x.username} />
                )}
            </div>
            {showDeleteIcon ?
                <span onDrop={onDrop} onDragOver={dragOverHandler} style={{ position: 'fixed', bottom: '10px', color: 'red' }}>
                    <i style={{ fontSize: 72 }} className="fa fa-trash" aria-hidden="true"></i>
                </span>
                : <></>}
        </section>
    );
};

export default GalleryPage;