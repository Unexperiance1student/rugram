import React, { useRef, useState } from 'react';
import './style.scss';
import UserBadge from '../UserBage/UserBage';
import Comment from '../Comment/Comments';
import { v4 } from 'uuid';

function DetaliedCard({
  id,
  authorId,
  userNameAuthor,
  avatarUrl,
  imgUrl,
  likes,
  isLikedByYou,
  comments,
  authorizedUser,
  onClickLike,
  onClickSend,
}) {
  const [isCommentShow, setIsCommentShow] = useState(false);
  // const [comment, setComment] = useState('');
  let textRef = useRef('');
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

  const textChange = () => {
    onClickSend(authorizedUser.nickname, textRef.current.value, id);
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
          onClick={() => onClickLike(authorizedUser.id, id)}
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
      <div className='cnDetailedCardTextareaWrapper'>
        <textarea
          ref={textRef}
          placeholder='Оставьте комментарий'
          className='cnDetailedCardTextarea'
        />
        <button
          onClick={textChange}
          className='cnDetailedCardButton'>
          Отправить
        </button>
      </div>
    </div>
  );
}

export default DetaliedCard;
