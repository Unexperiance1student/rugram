import React from 'react';
import { useDispatch } from 'react-redux';
import { likePost } from '../../../store/slice/postsSlice';
import './style.scss';

export default function Card({ imgUrl, likes, comments, isLikedByYou }) {
  const dispatch = useDispatch();
  const onClickLike = (authorizedUser, id) => {
    dispatch(likePost({ userId: authorizedUser, postId: id }));
  };

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
        />
        <span className='cnCardNumber cnCardLikes'>{likes}</span>
        <i className='fas fa-comment cnCardIcon' />
        <span className='cnCardNumber'>{comments}</span>
      </div>
    </div>
  );
}
