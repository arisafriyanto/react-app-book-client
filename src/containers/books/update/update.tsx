  import { Box, TextField, Switch, Stack } from '@mui/material';
  import CommonPage from '../../../components/common-page/common-page';
  import { CloudUpload } from '@mui/icons-material';
  import { LoadingButton } from '@mui/lab';
  import { useUpdate } from './update.hooks';
  import { VisuallyHiddenInput } from './update.styled';
  
  export default function Update() {
    const {
      formValues,
      loadingCover,
      loadingSubmit,
      fileItem,
      handleUploadCover,
      handleFormChange,
      handleSubmit,
    } = useUpdate();
  
    return (
      <CommonPage
        withBack
        component={'form'}
        title="Update Book"
        actionElement={
          <LoadingButton type="submit" variant="contained" loading={loadingSubmit}>
            Submit
          </LoadingButton>
        }
        onSubmit={handleSubmit}
      >
        <Box sx={{ width: '50%' }}>
          <TextField
            name="title"
            size="small"
            sx={{ width: '100%', mb: 3 }}
            label="Title"
            value={formValues.title}
            onChange={(e) => handleFormChange('title', e.target.value)}
          />
          <TextField
            name="author"
            size="small"
            sx={{ width: '100%', mb: 3 }}
            label="Author"
            value={formValues.author}
            onChange={(e) => handleFormChange('author', e.target.value)}
          />
          <TextField
            name="isbn"
            size="small"
            sx={{ width: '100%', mb: 3 }}
            label="ISBN"
            value={formValues.isbn}
            onChange={(e) => handleFormChange('isbn', e.target.value)}
          />
          <TextField
            name="published_year"
            size="small"
            sx={{ width: '100%', mb: 3 }}
            label="Published Year"
            type="number"
            value={formValues.published_year}
            onChange={(e) => handleFormChange('published_year', e.target.value)}
          />
          <TextField
            name="genre"
            size="small"
            sx={{ width: '100%', mb: 3 }}
            label="Genre"
            value={formValues.genre}
            onChange={(e) => handleFormChange('genre', e.target.value)}
          />
          <TextField
            name="total_copies"
            size="small"
            sx={{ width: '100%', mb: 3 }}
            label="Total Copies"
            type="number"
            value={formValues.total_copies}
            onChange={(e) => handleFormChange('total_copies', e.target.value)}
          />
          <TextField
            name="copies_available"
            size="small"
            sx={{ width: '100%', mb: 3 }}
            label="Copies Available"
            type="number"
            value={formValues.copies_available}
            onChange={(e) => handleFormChange('copies_available', e.target.value)}
          />
          <LoadingButton
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
            sx={{ mb: 3 }}
            loading={loadingCover}
          >
            Upload Book Cover
            <VisuallyHiddenInput
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleUploadCover}
            />
          </LoadingButton>
  
          {fileItem && fileItem.url && (
            <Box>
              <img
                src={fileItem.secure_url}
                alt="preview"
                style={{ width: '100%', objectFit: 'cover' }}
              />
            </Box>
          )}
  
          <Box>
            <Stack direction={'row'} alignItems={'center'}>
              <div>Publish</div>
              <Switch
                name="published"
                title="Published"
                checked={formValues.published}
                onChange={(e) => handleFormChange('published', e.target.checked)}
              />
            </Stack>
          </Box>
        </Box>
      </CommonPage>
    );
  }  