import React from 'react';
import { useSelector } from 'react-redux';
import { memoUser } from '../../../store/selector';
import UserBage from '../UserBage/UserBage';
import './style.scss';

function Navbar() {
  const { authorizedUser } = useSelector(memoUser);

  return (
    <div className='cnNavbarRoot'>
      <div className='cnNavbarWrapper'>
        <span>Rugram</span>
        <UserBage
          nickName={authorizedUser[0].nickname}
          avatarUrl={authorizedUser[0].avatarUrl}
          id={authorizedUser[0].id}
        />
      </div>
    </div>
  );
}

export default React.memo(Navbar);
