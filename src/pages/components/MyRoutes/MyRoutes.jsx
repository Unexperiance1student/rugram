import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../MainPage/MainPage';
import NonAccesPage from '../../NonAccesPage/NonAccesPage';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthorizedUser } from '../../../store/slice/userSlice';
import UserPage from '../../UserPage/UserPage';
import Loader from '../../../UI/Loader/Loader';

const authorizedRoutes = [
  { key: 1, path: '/', element: <MainPage />, exact: true },
  { key: 2, path: '/:id', element: <UserPage />, exact: true },
];
const NonAuthorizedRoutes = (
  <Route
    exact
    path='/'
    element={<NonAccesPage />}
  />
);

export default function MyRoutes() {
  const dispatch = useDispatch();
  const { authorizedUser, isUserLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAuthorizedUser());
  }, []);

  if (isUserLoading) return <Loader />;
  return (
    <BrowserRouter>
      <Routes>
        {authorizedUser
          ? authorizedRoutes.map((route) => <Route {...route} />)
          : NonAuthorizedRoutes}
      </Routes>
    </BrowserRouter>
  );
}
