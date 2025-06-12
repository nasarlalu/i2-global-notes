"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '@/redux/authSlice';
import { useRouter, usePathname } from "next/navigation"
import axios from 'axios';
import QuillEditorLatest from "@/components/TextEditor/TextEditor"
import Loader from '@/components/loader'


export default function notesAction() {

  const user_data = useSelector((state) => state?.auth?.userData);
  const dispatch = useDispatch();
  const router = useRouter()

  const pathname = usePathname()
  const notesSlug = pathname.split("/").filter(Boolean)[1] || "";

  const [noteData, setNoteData] = useState({
    userId: "",
    content: "",
    desc: "",
    slug: "",
    title: "",
    noteId: ""
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: null,
    success: null
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleContentChange = (value) => {
    setNoteData((prev) => ({
      ...prev,
      content: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus({ loading: true, error: null, success: null });
    try {
      const response = await axios.put(`/api/notes/${notesSlug}`, noteData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user_data?.token}`
        }
      });

      console.log(response.data, "update data")
      setFormStatus({ loading: false, success: "Post Updated Successfully", error: null });
      router.push("/notes")
    } catch (error) {
      setFormStatus({ loading: false, error: "Error while Updating Post", success: null });
    }
  };

  const handleNoteDelete = async (e) => {
    e.preventDefault()

    setFormStatus({ loading: true, error: null, success: null });
    try {
      const response = await axios.delete(`/api/notes/${notesSlug}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user_data?.token}`
        }
      });

      console.log(response.data, "deleted Note data")
      setFormStatus({ loading: false, success: "Note Deleted Successfully", error: null });
      router.push("/notes")
    } catch (error) {
      setFormStatus({ loading: false, error: "Error while Deleting Note", success: null });
    }
  }



  useEffect(() => {
    async function fetchNotes() {
      setFormStatus({ loading: true, error: null, success: null });
      try {
        const response = (await axios.get(`/api/notes/${notesSlug}`)).data;
        setNoteData({
          userId: response?.userId,
          content: response?.content,
          desc: response?.desc,
          slug: response?.slug,
          title: response?.title,
          noteId: response?._id
        })
        setFormStatus({ loading: false, error: null, success: "fetching Note sucess" });
      } catch (error) {
        console.error(error, "error");
        setFormStatus({ loading: false, error: "Error while fetching Note", success: null });
      }
    }
    fetchNotes()
  }, [])

  if (formStatus.loading) return <Loader />

  return (
    <section className='auth__section' style={{margin: "2.5rem 0"}}>
      <div className='auth__container'>
        <h1 className='auth__title'>Edit your Notes</h1>
        <form className='auth__form' onSubmit={handleSubmit}>

          {formStatus.error && <p className='auth__error'>{formStatus.error}</p>}

          <div className='auth__form-group'>
            <label>Title</label>
            <input onChange={handleChange} value={noteData.title} type='text' name='title' required />
          </div>

          <div className='auth__form-group'>
            <label>Content</label>
            <QuillEditorLatest value={noteData?.content} onChange={handleContentChange} />
            {/* <input onChange={handleChange} value={noteData.content} type='text' name='content' required /> */}
          </div>

          <div className='auth__form-group'>
            <label>Description</label>
            <input onChange={handleChange} value={noteData.desc} type='text' name='desc' required />
          </div>

          <div className='auth__form-group'>
            <label>Slug</label>
            <input onChange={handleChange} value={noteData.slug} type='text' name='slug' required />
          </div>

          <div className='auth__btnWrapper'>
            <button type='submit' className='auth__submit'>Update</button>
            <button type='button' className='auth__submit auth__submit--delete' onClick={handleNoteDelete}>Delete</button>
          </div>
        </form>

      </div>
    </section>
  )
}
