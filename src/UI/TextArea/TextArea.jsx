import React from 'react';
import './style.scss';

export default function TextArea({ textRef, placeholder }) {
  return (
    <textarea
      ref={textRef}
      placeholder={placeholder}
      className='cnTextarea'
    />
  );
}
