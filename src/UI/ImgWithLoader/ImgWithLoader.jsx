import React, { useState } from 'react';
import { Bars } from 'react-loader-spinner';
import './style.scss';

export default function ImgWithLoader({ src, alt, className }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className={`${className} cnImgWithLoaderRoot`}>
      {!isImageLoaded && (
        <div className='cnImgWithLoaderWrapper'>
          <Bars
            color='000BFF'
            width={15}
            height={15}
          />
        </div>
      )}
      <img
        className={`${
          isImageLoaded && 'cnImgWithLoaderImageLoaded'
        } cnImgWithLoaderImage`}
        src={src}
        alt={alt}
        onLoad={() => setIsImageLoaded(true)}
      />
    </div>
  );
}
