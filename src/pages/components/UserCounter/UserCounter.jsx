import React from 'react';
import './style.scss';

export default function UserCounter({ count, text }) {
  return (
    <div className='cnUserCounterRoot'>
      <span className='cnUserCounterCount'>{count}</span>
      <span className='cnUserCounterText'>{text}</span>
    </div>
  );
}
