import React from 'react';
import { useImages } from '../../services/galleryService';
import styles from './GalleryPage.module.css'
import Image from './Image';

const GalleryPage = () => {

    const images = useImages();

    return (
        <section id="gallery" className="section">
            <div className={styles.gallery}>
                {images?.map(x => 
                    <Image key={x.id} id={x.id} src={x.url} />
                )}
            </div>
        </section>
    );
};

export default GalleryPage;