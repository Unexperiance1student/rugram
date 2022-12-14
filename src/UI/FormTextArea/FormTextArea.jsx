import React from 'react';
import './style.scss';

export default function FormTextArea({ className, errorText, ...restProps }) {
  return (
    <div className={`cnInputRoot ${className}`}>
      <textarea
        {...restProps}
        className={` cnFormTextAreaRoot ${
          errorText && 'cnFormTextAreaWithError'
        }`}
      />
      <span className='cnInputError'>{errorText}</span>
    </div>
  );
}
