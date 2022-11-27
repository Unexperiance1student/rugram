import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { memoPost, memoUser } from '../../../store/selector';
import { likePost, sendComment } from '../../../store/slice/postsSlice';
import DetaliedCard from '../DetaliedCard/DetaliedCard';

export default function PostsList() {
  const dispatch = useDispatch();
  const { posts } = useSelector(memoPost);
  const { authorizedUser } = useSelector(memoUser);

  const onClickLike = (authorizedUser, id) => {
    dispatch(likePost({ userId: authorizedUser, postId: id }));
  };

  const onClickSend = (authorizedUser, comment, id) => {
    dispatch(sendComment({ user: authorizedUser, text: comment, postId: id }));
  };

  return (
    <>
      {posts.map(({ author, likes, imgUrl, comments, id }) => (
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
          authorizedUser={authorizedUser[0]}
          onClickLike={onClickLike}
          onClickSend={onClickSend}
        />
      ))}
    </>
  );
}
