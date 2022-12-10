import React, { useState } from 'react';
import PhotoModal from '../PhotoModal/PhotoModal';
import './style.scss';

export default function Card({
  imgUrl,
  likes,
  comments,
  isLikedByYou,
  onClickLike,
  id,
  userData,
  onClickSend,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className='cnCardRoot'>
      <img
        className='cnCardImage'
        src={imgUrl}
        alt='aoaoa'
      />
      <div className='cnCardHover' />
      <div className='cnCardIcons'>
        <i
          className={`${
            isLikedByYou ? 'fa-solid' : 'fa-regular'
          } fa-heart cnCardIcon`}
          onClick={() => onClickLike(id)}
        />
        <span className='cnCardNumber cnCardLikes'>{likes}</span>
        <i
          className='fas fa-comment cnCardIcon'
          onClick={() => setIsModalVisible(true)}
        />
        <span className='cnCardNumber'>{comments.length}</span>
      </div>
      <PhotoModal
        imgUrl={imgUrl}
        {...userData}
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        comments={comments}
        id={id}
        onCommentSubmit={onClickSend}
        isLikedByYou={isLikedByYou}
        onLikeClick={() => onClickLike(id)}
      />
    </div>
  );
}
