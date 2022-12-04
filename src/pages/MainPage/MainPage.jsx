import React, { useEffect, useState } from 'react';
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
  const { totalCount, posts, postError } = useSelector(memoPost);
  // useEffect(() => {}, []);

  const nextHandler = () => {
    setPage((prev) => prev + 1);
    dispatch(fetchPosts(page));
    console.log(page);
  };

  if (postError) return <h1>errors</h1>;
  return (
    <Layout>
      <div className='cnMainPageRoot'>
        <InfiniteScroll
          dataLength={posts.length}
          next={nextHandler}
          hasMore={posts.length < totalCount}
          loader={<Loader className={'cnMainPageLoader'} />}
          endMessage={<p>Thats all</p>}>
          <PostsList />
        </InfiniteScroll>
      </div>
    </Layout>
  );
}
