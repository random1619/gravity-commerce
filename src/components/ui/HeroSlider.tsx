'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSlider.module.css';

const slides = [
    {
        id: 1,
        image: '/slider/slide1.png',
        title: 'NEW ARRIVALS',
        subtitle: 'Fresh Styles for Campus',
        cta: 'Shop Now',
        link: '/shop?category=new',
    },
    {
        id: 2,
        image: '/slider/slide2.png',
        title: 'UNDER ₹999',
        subtitle: 'Drip on a Budget',
        cta: 'Explore Deals',
        link: '/shop?maxPrice=999',
    },
    {
        id: 3,
        image: '/slider/slide3.png',
        title: 'STUDENT DISCOUNT',
        subtitle: '20% OFF Everything',
        cta: 'Verify Now',
        link: '/discount',
    },
    {
        id: 4,
        image: '/slider/slide4.png',
        title: 'TRENDING NOW',
        subtitle: 'Street Style Essentials',
        cta: 'View Collection',
        link: '/shop?category=trending',
    },
    {
        id: 5,
        image: '/slider/slide5.png',
        title: 'THE OVERSIZED DROP',
        subtitle: 'Comfort Meets Style',
        cta: 'Shop Oversized',
        link: '/collections',
    },
];


const HeroSlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // Auto-play
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(nextSlide, 5000); // 5 seconds
            return () => clearInterval(interval);
        }
    }, [isPaused, nextSlide]);

    return (
        <div
            className={styles.sliderContainer}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className={styles.slider}>
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`${styles.slide} ${index === currentSlide ? styles.active : ''
                            }`}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority={index === 0}
                            className={styles.slideImage}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                className={`${styles.nav} ${styles.navPrev}`}
                onClick={prevSlide}
                aria-label="Previous slide"
            >
                ‹
            </button>
            <button
                className={`${styles.nav} ${styles.navNext}`}
                onClick={nextSlide}
                aria-label="Next slide"
            >
                ›
            </button>

            {/* Indicator Dots */}
            <div className={styles.indicators}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''
                            }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
