import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { BookList, BookCreate, BookUpdate, BookDetail } from './pages/books';
import Login from './pages/Login';
import { theme } from './config/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BookList />,
  },

  {
    path: '/detail/:id',
    element: <BookDetail />,
  },

  {
    path: '/create',
    element: <BookCreate />,
  },

  {
    path: '/update/:id',
    element: <BookUpdate />,
  },

  {
    path: '/login',
    element: <Login />,
  },
]);
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
