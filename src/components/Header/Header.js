import styles from './styles.module.css'
import Image from 'next/image';

export default function Header() {
    return (
        <header className={styles.header__section}>
            <div className='container'>
                <div className={styles.header__wrapper}>
                    <div className={styles.header__logo}>
                        <a href="/">
                            <Image src="/vercel.svg" alt="Logo" width={50} height={50} />
                        </a>
                    </div>
                    <nav className={styles.header__nav}>
                        <ul className={styles.nav__list}>
                            <li className={styles.nav__item}><a href="/">Home</a></li>
                            <li className={styles.nav__item}><a href="/about">About</a></li>
                            <li className={styles.nav__item}><a href="/account">Account</a></li>
                        </ul>
                    </nav>
                    <div className={styles.auth__btns}>
                        <a href="/sign-in" className={styles.header__btn + ' ' + styles.signIn}>Sign In</a>
                        <a href="/sign-up" className={styles.header__btn + ' ' + styles.signUp}>Sign Up</a>
                    </div>
                </div>
            </div>
        </header>
    )
}
