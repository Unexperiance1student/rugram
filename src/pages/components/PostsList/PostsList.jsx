import React from 'react';
import { useSelector } from 'react-redux';
import { memoPost, memoUser } from '../../../store/selector';
import DetaliedCard from '../DetaliedCard/DetaliedCard';

export default function PostsList() {
  const { posts, isPostsLoading } = useSelector(memoPost);
  const { authorizedUser } = useSelector(memoUser);
  return (
    <>
      {posts.map(({ author, likes, imgUrl, comments, id }) => (
        <DetaliedCard
          key={id}
          id={id}
          authorId={author.id}
          likes={likes.length}
          isLikedByYou={likes.includes(authorizedUser[0].id)}
          imgUrl={imgUrl}
          comments={comments}
          avatarUrl={author.avatarUrl}
          userNameAuthor={author.nickname}
          authorizedUser={authorizedUser[0]}
        />
      ))}
    </>
  );
}
