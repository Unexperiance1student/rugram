import React from 'react';
import './style.scss';

export default function Card({
  imgUrl,
  likes,
  comments,
  isLikedByYou,
  onClickLike,
  id,
}) {
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
        <i className='fas fa-comment cnCardIcon' />
        <span className='cnCardNumber'>{comments}</span>
      </div>
    </div>
  );
}
