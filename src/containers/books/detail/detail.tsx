import { Box, Typography, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import CommonPage from '../../../components/common-page/common-page';
import { useDetail } from './detail.hooks';

export default function BookDetail() {
  const { id } = useParams<{ id?: string }>();
  const { book, fileItem, loading } = useDetail(id || '');

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!book) {
    return <Typography>Book not found.</Typography>;
  }

  return (
    <CommonPage withBack title="Book Detail">
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Detail Information</Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Title</Typography>
            <Typography variant="body1">{book.title}</Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Author</Typography>
            <Typography variant="body1">{book.author}</Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>ISBN</Typography>
            <Typography variant="body1">{book.isbn}</Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Published Year</Typography>
            <Typography variant="body1">{book.published_year}</Typography>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Genre</Typography>
            <Typography variant="body1">{book.genre}</Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Copies Available</Typography>
            <Typography variant="body1">{book.copies_available}</Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>Total Copies</Typography>
            <Typography variant="body1">{book.total_copies}</Typography>
          </Box>

          {fileItem && fileItem.url && (
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Book Cover</Typography>
              <img
                src={fileItem.secure_url}
                alt="Book Cover"
                style={{ width: '100%', objectFit: 'cover', marginTop: '2px' }}
              />
            </Box>
          )}
        </Stack>
      </Stack>
    </CommonPage>
  );
}