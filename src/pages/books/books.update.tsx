import { BookUpdateContainer } from '../../containers/books';
import Dashboard from '../../layouts/dashboard';
import PrivateProvider from '../../providers/PrivateProvider';

export default function Update() {
  return (
    <PrivateProvider>
      <Dashboard>
        <BookUpdateContainer />
      </Dashboard>
    </PrivateProvider>
  );
}
