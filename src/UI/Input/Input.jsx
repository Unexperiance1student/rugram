import React from 'react';
import './style.scss';

export default function Input({ errorText, className, ...restProps }) {
  return (
    <div className={`cnInputRoot ${className}`}>
      <input
        className={`cnInputItem ${errorText && 'cnInputWithError'}`}
        {...restProps}
      />
      <span className='cnInputError'>{errorText}</span>
    </div>
  );
}
