"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from "./styles.module.css"
import Modal from "@/components/Modal/Modal"
import axios from 'axios'
import { useSelector } from 'react-redux';
import { normalizeDate } from "@/utils/normalizedate"

export default function notes() {

    const token = useSelector((state) => state?.auth?.userData?.token);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [notesData, setNotesData] = useState({
        title: "",
        content: "",
        desc: "",
        slug: "",
        userId: ""
    })

    const [formStatus, setFormStatus] = useState({
        loading: false,
        error: null,
        success: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotesData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const [notesDataList, setNotesDataList] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ loading: true, error: null, success: null });
        console.log(notesData, "notesData")
        try {
            const res = await axios.post('/api/notes', notesData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(res, "ress")

            setFormStatus({
                loading: false,
                success: res.data.message || 'Note created successfully',
                error: null
            });

        } catch (error) {
            setFormStatus({
                loading: false,
                error: error.response?.data?.message || error.message || 'Failed to create note',
                success: null
            });
            console.error(error, "error")
        }
    };


    async function fetchNotes() {
        try {
            const res = await axios.get('/api/notes', notesData);
            console.log(res.data, "notesdata")
            setNotesDataList(res?.data)
        } catch (error) {
            console.error(error, "error");

        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])






    return (
        <section className={styles.notes__section}>
            <div className='container'>
                <div className={styles.notes__wrapper}>
                    <button className={styles.notes__createBtn} onClick={() => setIsModalOpen(true)}>Create Note</button>
                    <div className={styles.notes__grid}>
                        {notesDataList.length > 0 && notesDataList?.map((item, i) => (
                            <div key={i} className={styles.notes__gridItem}>
                                <Link href={`/notes/${item.slug}`}>
                                    <div>{item.title}</div>
                                    <div>{item.desc}</div>
                                    <div>{item.content}</div>
                                    <div>{normalizeDate(item.createdAt)}</div>
                                    <div>{normalizeDate(item.updatedAt)}</div>

                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <form onSubmit={handleSubmit} className='auth__form'>

                    <div className='auth__form-group'>
                        <label>Title</label>
                        <input onChange={handleChange} type='text' name='title' required />
                    </div>

                    <div className='auth__form-group'>
                        <label>Content</label>
                        <input
                            className=''
                            type='text'
                            placeholder='Notes content'
                            name='content'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='auth__form-group'>
                        <label>Description</label>
                        <input
                            className=''
                            type='text'
                            placeholder='Notes Description'
                            name='desc'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='auth__form-group'>
                        <label>Slug</label>
                        <input
                            className=''
                            type='text'
                            placeholder='Enter the notes slug'
                            name='slug'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <input
                        type='hidden'
                        name='userId'
                        value={"Nasar123"}
                    />



                    <button type="submit" className="auth__submit"> Submit</button>
                </form>

                <button onClick={() => setIsModalOpen(false)}>Close</button>
            </Modal>
        </section>
    )
}
