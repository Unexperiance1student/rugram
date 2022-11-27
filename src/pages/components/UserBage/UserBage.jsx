import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

function UserBage({ nickName, avatarUrl, id }) {
  const navigate = useNavigate();

  const onUserBadgeClick = () => {
    navigate(`/${id}`);
  };

  return (
    <div
      className='cnUserBadgeRoot'
      onClick={onUserBadgeClick}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt='logo'
          className='cnUserBadgeAvatar'
        />
      ) : (
        <div className='cnUserBadgeLoaderImg'></div>
      )}
      <span className='cnUserBadgeName'>{nickName}</span>
    </div>
  );
}

export default UserBage;
