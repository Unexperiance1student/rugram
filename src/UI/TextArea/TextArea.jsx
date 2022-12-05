import React from 'react';
import './style.scss';

function TextArea({ textRef, placeholder }) {
  return (
    <textarea
      ref={textRef}
      placeholder={placeholder}
      className='cnTextarea'
    />
  );
}

export default React.memo(TextArea);
