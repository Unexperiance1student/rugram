import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import UserPage from './pages/UserPage/UserPage';

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<MainPage />}
        />
        <Route
          path='/:id'
          element={<UserPage />}
        />
      </Routes>
    </>
  );
}

export default App;
