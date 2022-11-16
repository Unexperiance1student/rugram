import React from 'react';
import './style.scss';

export default function Comment({ userName, text }) {
  return (
    <div className='cnCommentRoot'>
      <span className='cnCommentName'>{userName}:</span>
      <span>{text}</span>
    </div>
  );
}
