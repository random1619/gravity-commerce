'use client';

import React from 'react';
import styles from './ProductSkeleton.module.css';

const ProductSkeleton: React.FC = () => {
    return (
        <div className={styles.card}>
            <div className={`${styles.image} skeleton`}></div>
            <div className={styles.info}>
                <div className={`${styles.category} skeleton`}></div>
                <div className={`${styles.name} skeleton`}></div>
                <div className={`${styles.price} skeleton`}></div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
