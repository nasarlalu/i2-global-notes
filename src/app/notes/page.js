"use client"
import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import styles from "./styles.module.css"
import Modal from "@/components/Modal/Modal"
import axios from 'axios'
import { useSelector } from 'react-redux';
import { normalizeDate } from "@/utils/normalizedate"
import { useRouter } from 'next/navigation'
import QuillEditorLatest from "@/components/TextEditor/TextEditor"
import Loader from '@/components/loader'

export default function notes() {

    const user_data = useSelector((state) => state?.auth?.userData);
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [notesData, setNotesData] = useState({
        title: "",
        content: "",
        desc: "",
        slug: "",
        userId: user_data?.userId
    })

    const [formStatus, setFormStatus] = useState({
        loading: false,
        error: null,
        success: null
    });

    const slugify = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")      // Remove special characters
            .replace(/\s+/g, "-")              // Replace spaces with -
            .replace(/-+/g, "-")               // Replace multiple dashes with single dash
            .replace(/^-+|-+$/g, "");          // Trim leading/trailing dash
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "slug") {
            setNotesData((prev) => ({
                ...prev,
                slug: slugify(value),
            }));
        } else {
            setNotesData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleContentChange = (value) => {
        setNotesData((prev) => ({
            ...prev,
            content: value,
        }));
    };


    const [notesDataList, setNotesDataList] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ loading: true, error: null, success: null });
        console.log(notesData, "notesData")

        if (!notesData.content) {
            alert("Please fill the content.");
            return;
        }

        try {
            const res = await axios.post('/api/notes', notesData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user_data.token}`
                }
            });

            console.log(res, "ress")

            setFormStatus({
                loading: false,
                success: res.data.message || 'Note created successfully',
                error: null
            });

            setTimeout(() => {
                setIsModalOpen(false)
                router.refresh()
            }, 1000)

        } catch (error) {
            setFormStatus({
                loading: false,
                error: error.response?.data?.message || error.message || 'Failed to create note',
                success: null
            });
            console.error(error, "error")
        }
    };




    useEffect(() => {
        async function fetchNotes() {
            setFormStatus({
                loading: true,
                error: 'Failed to fetch note',
                success: null
            });
            try {
                const res = await axios.get('/api/notes', notesData);
                setNotesDataList(res?.data)
                setFormStatus({
                    loading: false,
                    error: null,
                    success: "fetch note success"
                });
            } catch (error) {
                console.error(error, "error");
                setFormStatus({
                    loading: false,
                    error: null,
                    success: "fetch note failed"
                });
            }
        }
        fetchNotes()
    }, [])




    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    if (formStatus.loading) return <Loader />

    return (
        <section className={styles.notes__section}>

            <div className='container'>
                <div className={styles.notes__wrapper}>
                    <div className={styles.notes__header}>
                        <h1>Welcome, {isClient && (user_data ? user_data?.username : "User")}</h1>
                        <button className={styles.notes__createBtn} onClick={() => setIsModalOpen(true)}>Create Note</button>
                    </div>
                    <div className={styles.notes__grid}>
                        {notesDataList.length > 0 ? notesDataList?.map((item, i) => (
                            <div key={i} className={styles.notes__gridItem}>
                                <Link href={`/notes/${item.slug}`}>
                                    <div className={styles.notes__gridBox}>
                                        <div className={styles.notes__gridheader}>
                                            <h2>{item.title}</h2>
                                        </div>

                                        <div className={styles.notes__gridContent}>
                                            <h6>{item.desc}</h6>
                                        </div>
                                        <div className={styles.notes__gridContentBox} dangerouslySetInnerHTML={{ __html: item?.content }} />
                                        <p className={styles.notes__gridfooter}>Created At:  {normalizeDate(item.createdAt)}</p>
                                    </div>

                                </Link>
                            </div>
                        )) : <h1>Create your First Note</h1>}
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
                        {/* <input
                            className=''
                            type='text'
                            placeholder='Notes content'
                            name='content'
                            onChange={handleChange}
                            required
                        /> */}
                        <QuillEditorLatest value={notesData?.content} onChange={handleContentChange} />
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
                        <label>Slug  <span className='auth__spanInfo'>(copy paste text for auto url)</span></label>
                        <input
                            className=''
                            type='text'
                            placeholder='Enter the notes slug'
                            name='slug'
                            value={notesData.slug}
                            onChange={handleChange}
                            required
                        />
                    </div>



                    <button type="submit" className="auth__submit"> Submit</button>
                    {formStatus.success && <p>{formStatus.success}</p>}
                    {formStatus.error && <p>{formStatus.error}</p>}
                </form>
            </Modal>
        </section>
    )
}
