import React, { useState } from 'react';
import './style.scss';
import UserBadge from '../UserBage/UserBage';
import Comment from '../Comment/Comments';

export default function DetaliedCard({
  userName = 'Vlad',
  avatarUrl,
  id,
  imgUrl,
  likes,
  isLikedByYou,
  comments,
}) {
  const [isCommentShow, setIsCommentShow] = useState(false);

  const renderComments = () => {
    if (comments.length > 2 && !isCommentShow) {
      const commentsCopy = [...comments];
      const commentsForRender = commentsCopy.splice(comments.lenght - 2, 2);
      return (
        <>
          <span
            className='cnDetailedCardCommentTitle'
            onClick={() => setIsCommentShow(!isCommentShow)}>
            {isCommentShow === false
              ? `Показать ещё ${
                  comments.length - commentsForRender.length
                } комментариев`
              : 'скрыть'}
          </span>
          {commentsForRender.map((comment) => (
            <Comment
              key={comment.id}
              userName={comment.userName}
              text={comment.text}
            />
          ))}
        </>
      );
    }
    return comments.map((comment) => (
      <Comment
        key={comment.id}
        userName={comment.userName}
        text={comment.text}
      />
    ));
  };

  return (
    <div className='cnDetailedCardRoot'>
      <div className='cnDetailedCardHeader'>
        <UserBadge
          userName={userName}
          avatarUrl={avatarUrl}
          id={id}
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
      <div className='cnDetailedCardComments'>{renderComments()}</div>
      <textarea className='cnDetailedCardTextarea' />
    </div>
  );
}
