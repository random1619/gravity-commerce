import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.brand}>
                    <h2 className={styles.logo}>GRAVITY.</h2>
                    <p className={styles.tagline}>High fashion. Low pressure. Budget-friendly trends for the next gen.</p>
                    <div className={styles.socials}>
                        <Link href="#">Instagram</Link>
                        <Link href="#">TikTok</Link>
                        <Link href="#">X / Twitter</Link>
                    </div>
                </div>

                <div className={styles.linksGrid}>
                    <div className={styles.linkGroup}>
                        <h3>Shop</h3>
                        <Link href="/shop">All Products</Link>
                        <Link href="/collections">New Arrivals</Link>
                        <Link href="/collections">Featured Drops</Link>
                        <Link href="/discount">Student Discount</Link>
                    </div>
                    <div className={styles.linkGroup}>
                        <h3>Help</h3>
                        <Link href="#">Support</Link>
                        <Link href="#">Order Status</Link>
                        <Link href="#">Shipping & Returns</Link>
                        <Link href="#">Size Guide</Link>
                    </div>
                    <div className={styles.linkGroup}>
                        <h3>About</h3>
                        <Link href="#">Our Story</Link>
                        <Link href="#">Sustainability</Link>
                        <Link href="#">Contact</Link>
                        <Link href="#">Trust Badges</Link>
                    </div>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} GRAVITY Fashion. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
