'use client';

import React, { useState } from 'react';
import styles from './DemoWarning.module.css';

export default function DemoWarning() {
    const [dismissed, setDismissed] = useState(false);

    // Check if user has dismissed the warning in this session
    React.useEffect(() => {
        const isDismissed = sessionStorage.getItem('demo-warning-dismissed');
        if (isDismissed) {
            setDismissed(true);
        }
    }, []);

    const handleDismiss = () => {
        sessionStorage.setItem('demo-warning-dismissed', 'true');
        setDismissed(true);
    };

    if (dismissed) return null;

    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <span className={styles.icon}>⚠️</span>
                <p className={styles.text}>
                    <strong>DEMO MODE:</strong> This is a demonstration e-commerce site.
                    No real transactions are processed. For educational purposes only.
                </p>
                <button className={styles.dismissBtn} onClick={handleDismiss}>
                    ✕
                </button>
            </div>
        </div>
    );
}
