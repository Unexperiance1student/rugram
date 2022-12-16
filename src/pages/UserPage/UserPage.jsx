import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { memoUser, memoUserPosts } from '../../store/selector';
import {
  fetchUserPosts,
  likeUserPost,
  sendCommentUserPost,
} from '../../store/slice/postsByUserSlice';
import Card from '../components/Card/Card';
import Layout from '../components/Layout/Layout';
import UserBio from '../components/UserBio/UserBio';
import './style.scss';
import { useParams } from 'react-router-dom';
import Loader from '../../UI/Loader/Loader';
import { fetchUser, userEdit } from '../../store/slice/userSlice';
import { toast } from 'react-toastify';

function UserPage() {
  const { id } = useParams();
  const { user, isUserLoading, authorizedUser } = useSelector(memoUser);
  const { posts, isPostsLoading, postUserError } = useSelector(memoUserPosts);
  const dispatch = useDispatch();
  const [postsForRender, setPostsForRender] = useState([]);

  useEffect(() => {
    dispatch(fetchUser(id));
    dispatch(fetchUserPosts(id));
  }, []);

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

  const onClickSend = (comment, PostId) => {
    dispatch(
      sendCommentUserPost({
        user: authorizedUser[0].nickname,
        text: comment,
        postId: PostId,
        postAuthorId: Number(id),
      })
    );
  };

  const textChange = (textRef, PostId) => {
    if (textRef.current.value) {
      onClickSend(textRef.current.value, PostId);
      textRef.current.focus();
      textRef.current.value = '';
    }
  };

  const onEdit = (data) => {
    dispatch(userEdit({ data, userId: id }));
  };

  if (postUserError)
    return (
      <Layout>
        <div className='cnMainPageRoot'>
          {toast.error('Something went wrong')}
        </div>
      </Layout>
    );
  if (isUserLoading || isPostsLoading) return <Loader />;
  console.log(user);

  return (
    <Layout>
      <div className='cnUserPageRoot'>
        <UserBio
          nickname={user[0].nickname}
          subscribed={user[0].subscribed.length}
          avatarUrl={user[0].avatarUrl}
          subscribers={user[0].subscribers.length}
          firstName={user[0].firstName}
          lastName={user[0].lastName}
          description={user[0].description}
          url={user[0].url}
          isMyPage={id == authorizedUser[0].id}
          isSubs={user[0].subscribers.includes(id)}
          onEdit={onEdit}
        />
        <div className='cnUserPageRootContant'>
          {postsForRender.length ? (
            postsForRender.map(({ comments, likes, imgUrl, id }) => (
              <Card
                key={id}
                id={id}
                imgUrl={imgUrl}
                likes={likes.length}
                comments={comments}
                isLikedByYou={likes.includes(authorizedUser[0].id)}
                onClickLike={onClickLike}
                userData={{
                  userName: user[0].nickname,
                  avatarUrl: user[0].avatarUrl,
                  userId: user[0].id,
                }}
                onClickSend={textChange}
              />
            ))
          ) : (
            <p className='cnUserPageNoPosts'>User dont have posts!</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default UserPage;
