import axios from 'axios';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { IBooks } from '../books.types';
import { IApiResponse, IMeta, IParams } from '../../../services/types';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://app-server-xkq7x2rzoa-uc.a.run.app/api/books';

export default function useList() {
    const navigate = useNavigate();
    const [params, setParams] = useState<IParams>({
        page: 1,
        size: 10,
    });
    const [meta, setMeta] = useState<IMeta>();
    const [loading, setLoading] = useState<boolean>(false);
    const [books, setBooks] = useState<IBooks[]>([]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setParams({
            ...params,
            search: value,
        });
    };

    const handleRemove = async (e: MouseEvent<HTMLButtonElement>, record: IBooks) => {
        e.stopPropagation();
        const confirmed = window.confirm('Are you sure want to delete?');
        if (confirmed) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }

                await axios.delete(`${API_BASE_URL}/${record.id}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                await fetchBooks();
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: IBooks) => {
        e.stopPropagation();
        navigate(`/update/${record.id}`);
    };

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await axios.get<IApiResponse<IBooks[]>>(API_BASE_URL, {
                params,
                headers: {
                    Authorization: localStorage.getItem('token') || '',
                },
            });
            setBooks(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [params]);

    return {
        books,
        params,
        setParams,
        loading,
        meta,
        handleEdit,
        handleRemove,
        handleSearch,
    };
}
