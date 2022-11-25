import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout/Layout';

export default function UserPage() {
  const { authorizedUser } = useSelector((state) => state.user);

  return (
    <Layout
      nickName={authorizedUser[0].nickname}
      id={authorizedUser[0].id}
      avatarUrl={authorizedUser[0].avatarUrl}>
      <div>UserPage</div>
    </Layout>
  );
}
