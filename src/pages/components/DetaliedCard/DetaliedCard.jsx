import React, { useState } from 'react';
import './style.scss';
import UserBadge from '../UserBage/UserBage';
import Comment from '../Comment/Comments';

export default function DetaliedCard({
  authorId,
  userNameAuthor,
  avatarUrl,
  imgUrl,
  likes,
  isLikedByYou,
  comments,
}) {
  const [isCommentShow, setIsCommentShow] = useState(false);

  const renderComments = () => {
    if (comments.length > 2 && !isCommentShow) {
      const commentsCopy = [...comments];
      const commentsForRender = commentsCopy.slice(-2);
      return (
        <>
          {commentsForRender.map((comment) => (
            <Comment
              key={comment.id}
              userName={comment.nickname}
              text={comment.text}
            />
          ))}
        </>
      );
    }
    return comments.map((comment) => (
      <Comment
        key={comment.id}
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
        <i className={`${isLikedByYou ? 'fa-solid' : 'fa-regular'} fa-heart`} />
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
