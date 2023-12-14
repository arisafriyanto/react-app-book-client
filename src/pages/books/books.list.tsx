import PrivateProvider from '../../providers/PrivateProvider';
import Dashboard from '../../layouts/dashboard';
import { BookListContainer } from '../../containers/books';

export default function books() {
  return (
    <PrivateProvider>
      <Dashboard>
        <BookListContainer />
      </Dashboard>
    </PrivateProvider>
  );
}
