import React from 'react';
import './style.scss';

function Button(props) {
  return (
    <button
      {...props}
      className={`cnButton ${props.className}`}
    />
  );
}

export default React.memo(Button);
