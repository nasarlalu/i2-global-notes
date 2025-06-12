"use client"

import { useState, useEffect } from 'react';
import styles from './styles.module.css'

export default function Modal({ isOpen, onClose, children }) {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };


    return (
        <div className={styles.modal__overlay + ' ' + (isVisible ? styles.show : "")}>
            <div className={styles.modal__wrapper}>
                <div className={styles.modal__header}>
                    <h6 className={styles.modal__headerTitle}>Add your note</h6>
                    <button className={styles.modal__closeButton} onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                <div className={styles.modal__content}>{children}</div>
            </div>
        </div>
    );
}