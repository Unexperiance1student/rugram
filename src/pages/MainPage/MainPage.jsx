import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Bars } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPostsQuery } from '../../store/api/postsApi';
import { fetchPostsTotalCount } from '../../store/slice/postsSlice';
import DetaliedCard from '../components/DetaliedCard/DetaliedCard';
import Layout from '../components/Layout/Layout';
import './style.scss';

export default function MainPage() {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(4);
  const { totalCount } = useSelector((state) => state.posts);

  const {
    data: posts = {},
    isLoading,
    isError,
    refetch,
  } = useGetPostsQuery(limit);

  const loader = (
    <div className='cnMainPageLoader'>
      <Bars
        color='#000BFF'
        width={70}
        height={70}
      />
    </div>
  );

  const nextHandler = () => {
    setLimit(limit + 4);
  };

  useEffect(() => {
    dispatch(fetchPostsTotalCount());
  }, []);

  useEffect(() => {
    refetch({ limit }).unwrap();
  }, [limit]);

  if (isError) return <h1>errors</h1>;
  return (
    <Layout
      nickName='Vlad'
      id={1}>
      <div className='cnMainPageRoot'>
        {isLoading ? (
          loader
        ) : (
          <InfiniteScroll
            dataLength={posts.length}
            next={() => nextHandler()}
            hasMore={posts.length < totalCount}
            loader={loader}
            endMessage={<p>Thats all</p>}>
            {posts.map((post) => (
              <DetaliedCard
                key={post.id}
                authorId={post.author.id}
                likes={post.likes.length}
                isLikedByYou={true}
                imgUrl={post.imgUrl}
                comments={post.comments}
                avatarUrl={post.author.avatarUrl}
                userNameAuthor={post.author.nickname}
              />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </Layout>
  );
}
