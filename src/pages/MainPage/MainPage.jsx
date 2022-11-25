import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { fetchPosts, fetchPostsTotalCount } from '../../store/slice/postsSlice';
import DetaliedCard from '../components/DetaliedCard/DetaliedCard';
import Layout from '../components/Layout/Layout';
import Loader from '../../UI/Loader/Loader';
import './style.scss';

export default function MainPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(2);
  const { totalCount, posts, postError } = useSelector((state) => state.posts);
  const { authorizedUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchPostsTotalCount());
    dispatch(fetchPosts());
  }, []);

  const nextHandler = () => {
    setPage((prev) => prev + 1);
    dispatch(fetchPosts(page));
  };

  const List = () => {
    return posts.map(({ author, likes, imgUrl, comments, id }) => (
      <DetaliedCard
        key={v4()}
        id={id}
        authorId={author.id}
        likes={likes.length}
        isLikedByYou={likes.includes(authorizedUser[0].id)}
        imgUrl={imgUrl}
        comments={comments}
        avatarUrl={author.avatarUrl}
        userNameAuthor={author.nickname}
      />
    ));
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
          <List />
        </InfiniteScroll>
      </div>
    </Layout>
  );
}
