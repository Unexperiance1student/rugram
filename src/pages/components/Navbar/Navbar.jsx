import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { memoUser } from '../../../store/selector';
import UserBage from '../UserBage/UserBage';
import './style.scss';

function Navbar() {
  const { authorizedUser } = useSelector(memoUser);

  return (
    <div className='cnNavbarRoot'>
      <div className='cnNavbarWrapper'>
        <Link
          to='/'
          className='cnNavbarLink'>
          Rugram
        </Link>
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
