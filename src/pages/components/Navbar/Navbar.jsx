import React from 'react';
import UserBage from '../UserBage/UserBage';
import './style.scss';

export default function Navbar({ nickName, avatarUrl, id }) {
  return (
    <div className='cnNavbarRoot'>
      <div className='cnNavbarWrapper'>
        <span>Rugram</span>
        <UserBage
          nickName={nickName}
          avatarUrl={avatarUrl}
          id={id}
        />
      </div>
    </div>
  );
}
