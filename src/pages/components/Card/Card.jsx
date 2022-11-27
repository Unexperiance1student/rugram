import React from 'react';
import './style.scss';

export default function Card({ imgUrl }) {
  return (
    <div className='cnCardRoot'>
      <img
        className='cnCardImage'
        src={imgUrl}
        alt='aoaoa'
      />
    </div>
  );
}
