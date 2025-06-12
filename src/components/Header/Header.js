"use client"
import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
import { removeUserdata } from '@/redux/authSlice';
import { useRouter } from "next/navigation"

export default function Header() {

    const router = useRouter()
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const user = useSelector((state) => state?.auth?.userData?.username);
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(removeUserdata())
        router.push("/authentication/sign-in")
    }

    return (
        <header className={styles.header__section}>
            <div className='container'>
                <div className={styles.header__wrapper}>
                    <div className={styles.header__logo}>
                        <Link href="/">
                            <Image src="/window.svg" alt="Logo" width={50} height={50} />
                        </Link>
                    </div>
                    <nav className={styles.header__nav}>
                        <ul className={styles.nav__list}>
                            <li className={styles.nav__item}><Link href="/">Home</Link></li>
                            <li className={styles.nav__item}><Link href="/notes">Notes</Link></li>
                            {/* <li className={styles.nav__item}><Link href="/account">Account</Link></li> */}
                        </ul>
                    </nav>
                    <div className={styles.auth__btns}>
                        {isClient && (user ? <button className={styles.logout__btn} onClick={handleLogout}>Logut</button> :
                            <React.Fragment>
                                <Link href="/authentication/sign-in">Sign In</Link>
                                <Link href="/authentication/sign-up">Sign Up</Link>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
