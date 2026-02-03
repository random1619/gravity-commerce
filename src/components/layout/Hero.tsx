'use client';

import React from 'react';
import styles from './Hero.module.css';
import Button from '../ui/Button';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={`container ${styles.content}`}>
                <div className={styles.textContent}>
                    <span className={styles.eyebrow}>NEW DROP IS LIVE</span>
                    <h1 className={styles.title}>
                        UNFILTERED <br />
                        <span>EXPRESSION.</span>
                    </h1>
                    <p className={styles.description}>
                        The Oversized Revolution is here. Shop the latest street drops starting at ₹499.
                    </p>
                    <div className={styles.cta}>
                        <Button size="lg" variant="primary">Shop Collection</Button>
                        <Button size="lg" variant="outline">View Drops</Button>
                    </div>
                </div>
            </div>
            <div className={styles.badgeContainer}>
                <div className={styles.badge}>9.9 Rating</div>
                <div className={styles.badge}>Student Verified</div>
            </div>
        </section>
    );
};

export default Hero;
