"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '@/redux/authSlice';
import { useRouter } from "next/navigation"
import { useAxios } from "@/hooks/useAxios"

export default function signIn() {

  const dispatch = useDispatch();
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: null,
    success: null
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus({ loading: true, error: null, success: null });

    try {
      const response = await fetch('/api/auth/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      const data = await response.json();
      console.log(data, "data")
      const reduxPayload = {
        userId: data?.data?.userId,
        token: data?.data?.token,
        username: data?.data?.username,
        email: data?.data?.email
      }
      dispatch(setUserData(reduxPayload));
      setFormStatus({ loading: false, success: data.message, error: null });
      router.push("/notes")
    } catch (error) {
      setFormStatus({ loading: false, error: error.message, success: null });
    }
  };
  useEffect(() => {
    if (formStatus.success) {
      console.log('Login successful:', formStatus.success);
    }
  }, [formStatus.success]);

  useEffect(() => {
    if (formStatus.error) {
      console.error('Login error:', formStatus.error);
    }
  }, [formStatus.error]);

  useEffect(() => {
    setFormStatus({ loading: false, error: null, success: null });
  }, []);


  return (
    <section className='auth__section'>
      <div className='auth__container'>
        <h1 className='auth__title'>Sign In</h1>
        <form className='auth__form' onSubmit={handleSubmit}>

          {formStatus.error && <p className='auth__error'>{formStatus.error}</p>}
          {formStatus.success && <p className='auth__success'>{formStatus.success}</p>}

          <div className='auth__form-group'>
            <label>Email</label>
            <input onChange={handleChange} type='email' name='email' required />
          </div>

          <div className='auth__form-group'>
            <label>Password</label>
            <input onChange={handleChange} type='password' name='password' required />
          </div>

          <button type='submit' className='auth__submit'>Log In</button>
        </form>
        <Link className='auth__footer' href='/sign-up'>Don't have an account? Sign Up</Link>

      </div>
    </section>
  )
}
