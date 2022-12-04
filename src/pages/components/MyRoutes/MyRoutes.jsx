import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../../MainPage/MainPage';
import NonAccesPage from '../../NonAccesPage/NonAccesPage';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthorizedUser } from '../../../store/slice/userSlice';
import UserPage from '../../UserPage/UserPage';
import Loader from '../../../UI/Loader/Loader';
import { v4 } from 'uuid';
import { memoUser } from '../../../store/selector';
import {
  fetchPosts,
  fetchPostsTotalCount,
} from '../../../store/slice/postsSlice';

const authorizedRoutes = [
  { key: v4(), path: '/', element: <MainPage />, exact: true },
  { key: v4(), path: '/:id', element: <UserPage />, exact: true },
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

  const { authorizedUser, isAuthorizedUserLoading } = useSelector(memoUser);
  useEffect(() => {
    dispatch(fetchAuthorizedUser());
    dispatch(fetchPostsTotalCount());
    dispatch(fetchPosts());
  }, []);

  if (isAuthorizedUserLoading) return <Loader />;
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
