import React, { useState } from 'react';
import './style.scss';
import UserBadge from '../UserBage/UserBage';
import Comment from '../Comment/Comments';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../../../store/slice/postsSlice';

export default function DetaliedCard({
  id,
  authorId,
  userNameAuthor,
  avatarUrl,
  imgUrl,
  likes,
  isLikedByYou,
  comments,
}) {
  const { authorizedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isCommentShow, setIsCommentShow] = useState(false);
  const renderComments = () => {
    if (comments.length > 2 && !isCommentShow) {
      const commentsCopy = [...comments];
      const commentsForRender = commentsCopy.slice(-2);
      return commentsForRender.map((comment) => (
        <Comment
          key={v4()}
          userName={comment.nickname}
          text={comment.text}
        />
      ));
    }
    return comments.map((comment) => (
      <Comment
        key={v4()}
        userName={comment.nickname}
        text={comment.text}
      />
    ));
  };

  return (
    <div className='cnDetailedCardRoot'>
      <div className='cnDetailedCardHeader'>
        <UserBadge
          nickName={userNameAuthor}
          avatarUrl={avatarUrl}
          id={authorId}
        />
      </div>
      <div>
        <img
          className='cnDetailedCardImg'
          src={imgUrl}
          alt='img'
        />
      </div>
      <div className='cnDetailedCardButtons'>
        <i
          onClick={() =>
            dispatch(likePost({ userId: authorizedUser[0].id, postId: id }))
          }
          className={`${isLikedByYou ? 'fa-solid' : 'fa-regular'} fa-heart`}
        />
        <i className='fa-solid fa-comment' />
      </div>
      <div className='cnDetailedCardLikes'>{`Оценили ${likes} человек`}</div>
      <div className='cnDetailedCardComments'>
        <span
          className='cnDetailedCardCommentTitle'
          onClick={() => setIsCommentShow(!isCommentShow)}>
          {comments.length > 2
            ? isCommentShow === false
              ? `Показать ещё комментарии`
              : 'скрыть'
            : null}
        </span>
        {renderComments()}
      </div>
      <textarea
        placeholder='Оставьте комментарий'
        className='cnDetailedCardTextarea'
      />
    </div>
  );
}
