import React from 'react';
import { useSelector } from 'react-redux';
import { memoUser } from '../../store/selector';
import Card from '../components/Card/Card';
import Layout from '../components/Layout/Layout';
import UserBio from '../components/UserBio/UserBio';
import './style.scss';

function UserPage() {
  const { authorizedUser, user } = useSelector(memoUser);
  console.log(user);
  return (
    <Layout>
      <div className='cnUserPageRoot'>
        <UserBio
          avatarUrl={authorizedUser[0].avatarUrl}
          nickname={authorizedUser[0].nickname}
          subscribed={authorizedUser[0].subscribed.length}
          subscribers={authorizedUser[0].subscribers.length}
          firstName={authorizedUser[0].firstName}
          lastName={authorizedUser[0].lastName}
          description={authorizedUser[0].description}
          url={authorizedUser[0].url}
        />
        <div className='cnUserPageRootContant'>
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </Layout>
  );
}

export default React.memo(UserPage);
