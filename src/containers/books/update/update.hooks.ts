import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { IFileItem } from '../../../services/types';
import { IBooks } from '../books.types';
import { useNavigate, useParams } from 'react-router-dom';

export function useUpdate() {
    const navigate = useNavigate();
    const params = useParams();
    const [loadingCover, setLoadingCover] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [fileItem, setFileItem] = useState<IFileItem>();
    const [formValues, setFormValues] = useState<IBooks>({
        title: '',
        author: '',
        isbn: '',
        published_year: '',
        genre: '',
        total_copies: 0,
        copies_available: 0,
        published: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://app-server-xkq7x2rzoa-uc.a.run.app/api/books/${params.id}`);
                setFileItem(response.data.data.cover);
                setFormValues(response.data.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchData();
    }, [params.id]);

    const handleUploadCover = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            try {
                setLoadingCover(true);
                const formData = new FormData();
                formData.append('cover', files[0]);

                const response = await axios.post(
                    'https://app-server-xkq7x2rzoa-uc.a.run.app/api/books/upload',
                    formData,
                    {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    }
                );

                setFileItem(response.data.data);
            } catch (error) {
                console.error('Error uploading cover:', error);
            } finally {
                setLoadingCover(false);
            }
        }
    };

    const handleFormChange = (field: keyof IBooks, value: string | boolean) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        try {
            setLoadingSubmit(true);
            const payload = { ...formValues, cover: fileItem };

            await axios.put(`https://app-server-xkq7x2rzoa-uc.a.run.app/api/books/${params.id}`, payload, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });

            console.log('Book details updated:', payload);
            navigate(-1);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    return {
        formValues,
        setFormValues,
        loadingCover,
        loadingSubmit,
        fileItem,
        handleUploadCover,
        handleFormChange,
        handleSubmit,
    };
}
