import React, { useRef, useState } from 'react';
import './style.scss';
import UserBadge from '../UserBage/UserBage';
import Comment from '../Comment/Comments';
import { v4 } from 'uuid';
import Button from '../../../UI/Button/Button';
import PhotoModal from '../PhotoModal/PhotoModal';
import TextArea from '../../../UI/TextArea/TextArea';

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
  let textRef = useRef('');
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const textChange = (textRef) => {
    if (textRef.current.value) {
      onClickSend(authorizedUser.nickname, textRef.current.value, id);
      textRef.current.focus();
    }
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
        <i
          className='fa-solid fa-comment'
          onClick={() => setIsModalVisible(true)}
        />
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
        <TextArea
          textRef={textRef}
          placeholder='Оставьте комментарий'
        />
        <Button
          onClick={() => textChange(textRef)}
          className='cnDetailedCardButton'>
          Отправить
        </Button>
      </div>
      <PhotoModal
        imgUrl={imgUrl}
        userName={userNameAuthor}
        avatarUrl={avatarUrl}
        userId={authorId}
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        comments={comments}
        onCommentSubmit={textChange}
        textRef={textRef}
      />
    </div>
  );
}

export default DetaliedCard;
