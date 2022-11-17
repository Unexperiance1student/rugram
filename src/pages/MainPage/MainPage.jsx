import React from 'react';
import { useGetPostsQuery } from '../../store/api/postsApi';
import DetaliedCard from '../components/DetaliedCard/DetaliedCard';
import Layout from '../components/Layout/Layout';

export default function MainPage() {
  const count = 5;
  const { data = {}, isLoading, isError } = useGetPostsQuery(count);
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <Layout
      nickName='Vlad'
      id={1}>
      {data.map((post) => (
        <DetaliedCard
          key={post.id}
          authorId={post.author.id}
          userName={post.author.nickname}
          likes={post.likes}
          isLikedByYou={true}
          imgUrl={post.imgUrl}
          comments={post.comments}
          avatarUrl={post.author.avatarUrl}
          userNameAuthor={post.author.nickname}
        />
      ))}
    </Layout>
  );
}
