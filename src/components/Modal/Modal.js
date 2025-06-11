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
                <button className={styles.modal__closeButton} onClick={handleClose}>
                    X
                </button>
                <div className={styles.modal__content}>{children}</div>
            </div>
        </div>
    );
}