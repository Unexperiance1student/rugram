import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/slice/postsSlice';
import Layout from '../components/Layout/Layout';
import Loader from '../../UI/Loader/Loader';
import './style.scss';
import PostsList from '../components/PostsList/PostsList';
import { memoPost } from '../../store/selector';

export default function MainPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);
  const { totalCount, posts } = useSelector(memoPost);
  const nextHandler = () => {
    setPage((prev) => prev + 1);
    dispatch(fetchPosts(page));
  };

  return (
    <Layout>
      <div className='cnMainPageRoot'>
        <InfiniteScroll
          dataLength={posts.length}
          next={nextHandler}
          hasMore={posts.length < totalCount}
          loader={<Loader className={'cnMainPageLoader'} />}
          endMessage={''}>
          <PostsList />
        </InfiniteScroll>
      </div>
    </Layout>
  );
}
