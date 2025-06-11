"use client"
import React from 'react'
import styles from "./styles.module.css"

export default function notes() {

    return (
        <section className={styles.notes__section}>
            <div className='container'>
                <div className={styles.notes__wrapper}>
                    <button className={styles.notes__createBtn}>Create Note</button>
                    <div className={styles.notes__grid}>

                        <div className={styles.notes__gridItem}>
                            <div>Notes 1</div>
                            <div>Dummy note</div>
                        </div>

                        <div className={styles.notes__gridItem}>
                            <div>Notes 1</div>
                            <div>Dummy note</div>
                        </div>

                        <div className={styles.notes__gridItem}>
                            <div>Notes 1</div>
                            <div>Dummy note</div>
                        </div>

                        <div className={styles.notes__gridItem}>
                            <div>Notes 1</div>
                            <div>Dummy note</div>
                        </div>
                    </div>
                </div>
            </div>


            <div className=''></div>
        </section>
    )
}
