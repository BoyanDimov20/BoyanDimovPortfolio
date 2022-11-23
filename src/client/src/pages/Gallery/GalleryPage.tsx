import React from 'react';
import styles from './GalleryPage.module.css'
import Image from './Image';

const GalleryPage = () => {

    return (
        <section id="gallery" className="section">
            <div className={styles.gallery}>
                {new Array(4).map((x, i) =>
                    <img src={`gallery/${i + 1}.jpg`} />
                )}
                <Image src={`gallery/1.png`} />
                <Image src={`gallery/2.jpg`} />
                <Image src={`gallery/3.jpg`} />
                <Image src={`gallery/4.jpg`} />
                <Image src={`gallery/1.png`} />
                <Image src={`gallery/2.jpg`} />
                <Image src={`gallery/3.jpg`} />
                <Image src={`gallery/4.jpg`} />
                <Image src={`gallery/5.jpg`} />
            </div>
            
        </section>
    );
};

export default GalleryPage;