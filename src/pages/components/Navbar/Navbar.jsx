import React from 'react';
import UserBage from '../UserBage/UserBage';
import './style.scss';

export default function Navbar() {
  return (
    <div className='cnNavbarRoot'>
      <div className='cnNavbarWrapper'>
        <span>Rugram</span>
        <UserBage />
      </div>
    </div>
  );
}
