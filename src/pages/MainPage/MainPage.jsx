import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Bars } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { fetchPosts, fetchPostsTotalCount } from '../../store/slice/postsSlice';
import DetaliedCard from '../components/DetaliedCard/DetaliedCard';
import Layout from '../components/Layout/Layout';
import './style.scss';

export default function MainPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { totalCount, posts, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostsTotalCount());
    dispatch(fetchPosts());
  }, []);

  const loader = (
    <div className='cnMainPageLoader'>
      <Bars
        color='#000BFF'
        width={70}
        height={70}
      />
    </div>
  );

  const List = () => {
    return posts.map((post) => (
      <DetaliedCard
        key={v4()}
        authorId={post.author.id}
        likes={post.likes.length}
        isLikedByYou={true}
        imgUrl={post.imgUrl}
        comments={post.comments}
        avatarUrl={post.author.avatarUrl}
        userNameAuthor={post.author.nickname}
      />
    ));
  };

  const nextHandler = () => {
    setPage((prev) => prev + 1);
    dispatch(fetchPosts(page));
  };

  if (error) return <h1>errors</h1>;
  return (
    <Layout
      nickName='Vlad'
      id={1}>
      <div className='cnMainPageRoot'>
        <InfiniteScroll
          dataLength={posts.length}
          next={nextHandler}
          hasMore={posts.length < totalCount}
          loader={loader}
          endMessage={<p>Thats all</p>}>
          <List />
        </InfiniteScroll>
      </div>
    </Layout>
  );
}
