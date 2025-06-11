"use client"
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export function useAxios() {
    const token = useSelector((state) => state?.auth?.userData?.token);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const request = useCallback(async (
        {
            method = "GET",
            url = "/",
            data = {}
        }) => {
        setLoading(true);
        setError(null);

        try {
            const instance = axios.create({
                baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });

            const result = await instance({

            });
            setResponse(result.data);
            return result.data;
        } catch (err) {
            const errorData = err.response?.data || { message: err.message };
            setError(errorData);
            throw errorData;
        } finally {
            setLoading(false);
        }
    }, [token]);

    return { response, error, loading, request };
}