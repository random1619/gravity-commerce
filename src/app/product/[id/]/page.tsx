'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';

const mockProduct = {
    id: '1',
    name: 'Oversized Graffiti Tee',
    price: 699,
    originalPrice: 1299,
    category: 'T-Shirts',
    description: 'Unleash your street style with our signature Graffiti Tee. Made from 100% premium heavy-weight cotton for that perfect oversized drape. Featuring custom high-density puff print graphics.',
    fabric: '100% Combed Cotton, 240 GSM',
    fit: 'Oversized / Boxy Fit',
    care: 'Machine wash cold, tumble dry low, do not iron on print.',
    images: [
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    reviews: [
        { id: 1, user: 'Rahul S.', rating: 5, comment: 'Perfect fit! The quality of the fabric is seriously amazing for the price.' },
        { id: 2, user: 'Anjali K.', rating: 4, comment: 'Love the oversized look. Delivery was super fast too.' }
    ]
};

const relatedProducts = [
    { id: '2', name: 'Acid Wash Cargos', price: 999, originalPrice: 1899, category: 'Bottoms', imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500' },
    { id: '3', name: 'Desert Storm Hoodie', price: 1299, originalPrice: 2499, category: 'Hoodies', imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500' },
    { id: '4', name: 'Cobalt Blue Joggers', price: 899, originalPrice: 1599, category: 'Bottoms', imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=500' },
];

export default function ProductDetail() {
    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('M');

    return (
        <div className={`container ${styles.productPage}`}>
            <div className={styles.productLayout}>
                {/* Gallery Section */}
                <section className={styles.gallery}>
                    <div className={styles.mainImage}>
                        <img src={mockProduct.images[activeImage]} alt={mockProduct.name} />
                    </div>
                    <div className={styles.thumbnails}>
                        {mockProduct.images.map((img, idx) => (
                            <button
                                key={idx}
                                className={`${styles.thumb} ${activeImage === idx ? styles.activeThumb : ''}`}
                                onClick={() => setActiveImage(idx)}
                            >
                                <img src={img} alt={`${mockProduct.name} thumbnail ${idx}`} />
                            </button>
                        ))}
                    </div>
                </section>

                {/* Info Section */}
                <section className={styles.info}>
                    <p className={styles.category}>{mockProduct.category}</p>
                    <h1 className={styles.name}>{mockProduct.name}</h1>
                    <div className={styles.priceRow}>
                        <span className={styles.price}>₹{mockProduct.price}</span>
                        <span className={styles.oldPrice}>₹{mockProduct.originalPrice}</span>
                        <span className={styles.discount}>Save ₹{mockProduct.originalPrice - mockProduct.price}</span>
                    </div>

                    <div className={styles.selector}>
                        <h3>Select Size</h3>
                        <div className={styles.sizeGrid}>
                            {mockProduct.sizes.map(size => (
                                <button
                                    key={size}
                                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.activeSize : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                        <button className={styles.sizeGuide}>View Size Guide</button>
                    </div>

                    <div className={styles.actions}>
                        <Button variant="primary" size="lg" className={styles.addToCart}>Add to Cart</Button>
                        <Button variant="outline" size="lg" className={styles.wishlist}>♡</Button>
                    </div>

                    <div className={styles.details}>
                        <div className={styles.detailItem}>
                            <h4>Fabric & Care</h4>
                            <p>{mockProduct.fabric}</p>
                            <p>{mockProduct.care}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <h4>Product Description</h4>
                            <p>{mockProduct.description}</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Reviews Section */}
            <section className={styles.reviewsSection}>
                <h2>What Students Say</h2>
                <div className={styles.reviewsGrid}>
                    {mockProduct.reviews.map(review => (
                        <div key={review.id} className={styles.reviewCard}>
                            <div className={styles.rating}>★★★★★</div>
                            <p className={styles.comment}>"{review.comment}"</p>
                            <p className={styles.user}>- {review.user}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Related Products */}
            <section className={styles.relatedSection}>
                <h2>You Might Also Like</h2>
                <div className={styles.relatedGrid}>
                    {relatedProducts.map(p => <ProductCard key={p.id} {...p} />)}
                </div>
            </section>
        </div>
    );
}
