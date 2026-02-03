'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import Button from '../ui/Button';
import { useTheme } from '@/lib/ThemeContext';
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';
import LoginModal from '../ui/LoginModal';


const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { cartCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const [search, setSearch] = useState('');
    const [trends, setTrends] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                const res = await fetch('/api/products');
                const products = await res.json();
                const uniqueCategories = Array.from(new Set(products.map((p: any) => p.category))) as string[];
                setTrends([...uniqueCategories, 'Oversized', 'Streetwear', 'New Drops']);
            } catch (err) {
                console.error('Failed to fetch trends', err);
            }
        };
        fetchTrends();
    }, []);

    const filteredTrends = trends.filter(trend =>
        trend.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    GRAVITY.
                </Link>

                <div className={styles.links}>
                    <Link href="/shop" className={styles.link}>Shop</Link>
                    <Link href="/collections" className={styles.link}>New Drops</Link>
                    <Link href="/discount" className={styles.link}>Student Offer</Link>
                </div>

                <div className={styles.actions}>
                    <div className={styles.searchBar} ref={searchRef}>
                        <input
                            type="text"
                            placeholder="Search trends..."
                            className={styles.searchInput}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                        />
                        {showSuggestions && search && (
                            <div className={styles.suggestions}>
                                {filteredTrends.length > 0 ? (
                                    filteredTrends.map(trend => (
                                        <div
                                            key={trend}
                                            className={styles.suggestion}
                                            onClick={() => {
                                                setSearch(trend);
                                                setShowSuggestions(false);
                                            }}
                                        >
                                            {trend}
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.noSuggestion}>No results found</div>
                                )}
                            </div>
                        )}
                    </div>

                    <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>

                    <button className={styles.iconBtn} aria-label="Cart">
                        <Link href="/cart">
                            <div className={styles.cartIcon}>
                                🛒
                                <span className={styles.badge}>{cartCount}</span>
                            </div>
                        </Link>
                    </button>

                    {isAuthenticated ? (
                        <div className={styles.userMenu}>
                            <button className={styles.userBtn} onClick={logout}>
                                👤 {user?.name}
                            </button>
                        </div>
                    ) : (
                        <Button variant="primary" size="sm" onClick={() => setShowLoginModal(true)}>
                            Login
                        </Button>
                    )}
                </div>
            </div>

            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </nav>
    );
};

export default Navbar;
