import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyRoutes from './pages/components/MyRoutes/MyRoutes';

function App() {
  return (
    <>
      <MyRoutes />
      <ToastContainer position='top-center' />
    </>
  );
}

export default App;
