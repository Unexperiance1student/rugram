import React from 'react';
import DetaliedCard from '../components/DetaliedCard/DetaliedCard';
import Layout from '../components/Layout/Layout';

export default function MainPage() {
  return (
    <Layout
      nickName='Vlad'
      id={1}>
      <div>MainPage</div>
      <DetaliedCard
        userName='Vlad'
        id={1}
        likes={10}
        isLikedByYou={true}
        comments={[
          { id: 1, text: 'хочу', userName: 'Dima' },
          { id: 'asd', text: 'хочу', userName: '324' },
          { id: '12dsaw', text: 'хочу', userName: 'dsf' },
          { id: 4, text: 'хочу', userName: 'zxc' },
        ]}
        imgUrl='https://cdnb.artstation.com/p/assets/covers/images/051/030/769/large/immanuel-sabwami-immanuel-sabwami-iphone-14-pro-max-r4.jpg?1656302012'
      />
    </Layout>
  );
}
