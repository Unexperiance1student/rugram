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

function UserPage() {
  const { authorizedUser } = useSelector(memoUser);
  const { posts, isPostsLoading } = useSelector(memoUserPosts);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [postsForRender, setPostsForRender] = useState([]);

  useEffect(() => {
    dispatch(fetchUserPosts(id));
  }, []);

  useEffect(() => {
    if (posts.length) setPostsForRender([...posts].splice(0, 12));
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
          {postsForRender.map(({ comments, likes, imgUrl, id }) => (
            <Card
              key={v4()}
              id={id}
              imgUrl={imgUrl}
              likes={likes.length}
              comments={comments.length}
              isLikedByYou={likes.includes(authorizedUser[0].id)}
              onClickLike={onClickLike}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default React.memo(UserPage);
