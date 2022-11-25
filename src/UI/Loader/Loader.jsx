import React from 'react';
import { Bars } from 'react-loader-spinner';
import './style.scss';

export default function Loader({ className = 'cnLoader' }) {
  return (
    <div className={className}>
      <Bars
        color='#000BFF'
        width={70}
        height={70}
      />
    </div>
  );
}
