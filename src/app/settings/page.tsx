'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { useAuth } from '@/lib/AuthContext';
import { useTheme } from '@/lib/ThemeContext';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function SettingsPage() {
    const { user, isAuthenticated, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [notifications, setNotifications] = useState(true);
    const [newsletter, setNewsletter] = useState(true);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyState}>
                    <h1>⚙️ Settings</h1>
                    <p>Please login to manage your settings</p>
                    <Link href="/" className={styles.button}>
                        Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>⚙️ Settings</h1>
            <p className={styles.subtitle}>Manage your account preferences</p>

            <div className={styles.sections}>
                {/* Profile Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Profile</h2>
                    <div className={styles.card}>
                        <div className={styles.avatar}>👤</div>
                        <div className={styles.profileInfo}>
                            <h3>{user?.name}</h3>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Appearance Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Appearance</h2>
                    <div className={styles.card}>
                        <div className={styles.setting}>
                            <div>
                                <h4>Dark Mode</h4>
                                <p>Switch between light and dark themes</p>
                            </div>
                            <button
                                className={`${styles.toggle} ${theme === 'dark' ? styles.active : ''}`}
                                onClick={toggleTheme}
                            >
                                <span className={styles.toggleThumb}></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Notifications</h2>
                    <div className={styles.card}>
                        <div className={styles.setting}>
                            <div>
                                <h4>Push Notifications</h4>
                                <p>Get notified about orders and offers</p>
                            </div>
                            <button
                                className={`${styles.toggle} ${notifications ? styles.active : ''}`}
                                onClick={() => setNotifications(!notifications)}
                            >
                                <span className={styles.toggleThumb}></span>
                            </button>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.setting}>
                            <div>
                                <h4>Newsletter</h4>
                                <p>Receive weekly style updates</p>
                            </div>
                            <button
                                className={`${styles.toggle} ${newsletter ? styles.active : ''}`}
                                onClick={() => setNewsletter(!newsletter)}
                            >
                                <span className={styles.toggleThumb}></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Account Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Account</h2>
                    <div className={styles.card}>
                        <button className={styles.dangerBtn} onClick={logout}>
                            🚪 Logout
                        </button>
                    </div>
                </div>
            </div>

            {saved && (
                <div className={styles.toast}>
                    ✓ Settings saved successfully!
                </div>
            )}
        </div>
    );
}
