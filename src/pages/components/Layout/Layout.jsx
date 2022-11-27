import React from 'react';
import Navbar from '../Navbar/Navbar';
import './style.scss';

function Layout({ children }) {
  return (
    <div className='cnLayoutRoot'>
      <Navbar />
      <div className='cnLayoutBody'>{children}</div>
    </div>
  );
}

export default Layout;
