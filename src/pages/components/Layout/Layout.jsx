import React from 'react';
import Navbar from '../Navbar/Navbar';
import './style.scss';

export default function Layout({ nickName, avatarUrl, id, children }) {
  return (
    <div className='cnLayoutRoot'>
      <Navbar
        nickName={nickName}
        avatarUrl={avatarUrl}
        id={id}
      />
      <div className='cnLayoutBody'>{children}</div>
    </div>
  );
}
