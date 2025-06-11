import styles from './styles.module.css'
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className={styles.header__section}>
            <div className='container'>
                <div className={styles.header__wrapper}>
                    <div className={styles.header__logo}>
                        <Link href="/">
                            <Image src="/vercel.svg" alt="Logo" width={50} height={50} />
                        </Link>
                    </div>
                    <nav className={styles.header__nav}>
                        <ul className={styles.nav__list}>
                            <li className={styles.nav__item}><Link href="/">Home</Link></li>
                            <li className={styles.nav__item}><Link href="/about">About</Link></li>
                            <li className={styles.nav__item}><Link href="/account">Account</Link></li>
                        </ul>
                    </nav>
                    <div className={styles.auth__btns}>
                        <Link href="/sign-in" className={styles.header__btn + ' ' + styles.signIn}>Sign In</Link>
                        <Link href="/sign-up" className={styles.header__btn + ' ' + styles.signUp}>Sign Up</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
