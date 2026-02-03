'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import Hero from '@/components/layout/Hero';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';


export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [budgetDrops, setBudgetDrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        // Fetch specific segments for homepage
        const [res1, res2] = await Promise.all([
          fetch('/api/products?maxPrice=2000'), // Featured
          fetch('/api/products?maxPrice=999'), // Budget
        ]);

        const data1 = await res1.json();
        const data2 = await res2.json();

        setFeaturedProducts(data1.slice(0, 4));
        setBudgetDrops(data2.slice(0, 4));
      } catch (error) {
        console.error('Home data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className={styles.home}>
      <Hero />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>NEWEST DROPS</h2>
              <p className={styles.sectionSubtitle}>The freshest styles for the semester.</p>
            </div>
            <Link href="/shop" className={styles.viewAll}>View All →</Link>
          </div>
          <div className={styles.productGrid}>
            {featuredProducts.map(p => <ProductCard key={p.id} {...p} />)}
          </div>
        </div>
      </section>

      <section className={styles.discountBanner}>
        <div className="container">
          <div className={styles.bannerContent}>
            <h2>VERIFIED STUDENT?</h2>
            <p>Get an extra 20% OFF on all orders. Link your ID in 30 seconds.</p>
            <Button variant="secondary" size="lg">Verify Now</Button>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.budgetBg}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>UNDER ₹999</h2>
              <p className={styles.sectionSubtitle}>Drip on a budget. No compromises.</p>
            </div>
            <Button variant="outline" size="sm">Explore Deals</Button>
          </div>
          <div className={styles.productGrid}>
            {budgetDrops.map(p => <ProductCard key={p.id} {...p} />)}
          </div>
        </div>
      </section>

      {/* Mini Reels Section Preview */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>WATCH THE VIBE</h2>
          <div className={styles.reelsGrid}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={styles.reelPlaceholder}>
                <img src={`/reel-${i}.png`} alt={`Gravity Reel ${i}`} className={styles.reelImage} />
                <div className={styles.reelOverlay}>▶ Play</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
