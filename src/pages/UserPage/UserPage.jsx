import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { memoUser, memoUserPosts } from '../../store/selector';
import {
  fetchUserPosts,
  likeUserPost,
} from '../../store/slice/postsByUserSlice';
import Card from '../components/Card/Card';
import Layout from '../components/Layout/Layout';
import UserBio from '../components/UserBio/UserBio';
import { v4 } from 'uuid';
import './style.scss';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../../UI/Loader/Loader';
import { fetchUser } from '../../store/slice/userSlice';

function UserPage() {
  const { id } = useParams();
  const { user, isUserLoading, authorizedUser } = useSelector(memoUser);
  const { posts, isPostsLoading } = useSelector(memoUserPosts);
  const dispatch = useDispatch();
  const [postsForRender, setPostsForRender] = useState([]);
  // const [page, setPage] = useState(0);

  // useEffect(() => {
  //   dispatch(fetchUserPosts(id));
  //   dispatch(fetchUser(id));
  // }, []);

  useEffect(() => {
    dispatch(fetchUser(id));
    dispatch(fetchUserPosts(id));
  }, [id]);

  useEffect(() => {
    if (posts.length) {
      setPostsForRender([...posts].splice(0, 12));
    } else {
      setPostsForRender([]);
    }
  }, [posts]);

  const onClickLike = (PostId) => {
    dispatch(
      likeUserPost({
        userId: authorizedUser[0].id,
        postId: PostId,
        postAuthorId: Number(id),
      })
    );
  };

  const nextHandler = () => {
    // const newPosts = [...posts];
    // const offSet = 12 * (page + 1);
    // setPostsForRender([
    //   ...postsForRender,
    //   ...newPosts.splice(offSet, offSet + 12),
    // ]);
    // setPage(page + 1);
  };
  // console.log(posts.length);

  if (isUserLoading || isPostsLoading) return <Loader />;
  return (
    <Layout>
      <div className='cnUserPageRoot'>
        <UserBio
          avatarUrl={user[0].avatarUrl}
          nickname={user[0].nickname}
          subscribed={user[0].subscribed.length}
          subscribers={user[0].subscribers.length}
          firstName={user[0].firstName}
          lastName={user[0].lastName}
          description={user[0].description}
          url={user[0].url}
          isMyPage={id == authorizedUser[0].id}
          isSubs={user[0].subscribers.includes(id)}
        />
        <div className='cnUserPageRootContant'>
          {postsForRender.length ? (
            // <InfiniteScroll
            //   className='cnUserPageScroll'
            //   dataLength={postsForRender.length}
            //   next={nextHandler}
            //   hasMore={postsForRender.length < posts.length}
            //   loader={<Loader className={'cnMainPageLoader'} />}>
            postsForRender.map(({ comments, likes, imgUrl, id }) => (
              <Card
                key={v4()}
                id={id}
                imgUrl={imgUrl}
                likes={likes.length}
                comments={comments.length}
                isLikedByYou={likes.includes(authorizedUser[0].id)}
                onClickLike={onClickLike}
              />
            ))
          ) : (
            // </InfiniteScroll>
            <p className='cnUserPageNoPosts'>User dont have posts!</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default UserPage;
