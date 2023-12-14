import { useEffect, useState } from 'react';
import axios from 'axios';
import { IBooks } from '../books.types';
import { IFileItem } from '../../../services/types';

export function useDetail(id: string) {
    const [book, setBook] = useState<IBooks | null>(null);
    const [fileItem, setFileItem] = useState<IFileItem | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/api/books/${id}`);
                setFileItem(response.data.data.cover);
                setBook(response.data.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { book, fileItem, loading };
}
