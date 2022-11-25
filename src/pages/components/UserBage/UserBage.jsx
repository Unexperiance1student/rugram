import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export default function UserBage() {
  const navigate = useNavigate();
  const { authorizedUser } = useSelector((state) => state.user);

  const onUserBadgeClick = () => {
    navigate(`/${authorizedUser[0].id}`);
  };

  return (
    <div
      className='cnUserBadgeRoot'
      onClick={onUserBadgeClick}>
      {authorizedUser[0].avatarUrl ? (
        <img
          src={authorizedUser[0].avatarUrl}
          alt='logo'
          className='cnUserBadgeAvatar'
        />
      ) : (
        <div className='cnUserBadgeLoaderImg'></div>
      )}
      <span className='cnUserBadgeName'>{authorizedUser[0].nickname}</span>
    </div>
  );
}
