import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Button from '../../../UI/Button/Button';
import UserCounter from '../UserCounter/UserCounter';
import './style.scss';

function UserBio({
  avatarUrl,
  nickname,
  subscribed,
  subscribers,
  firstName,
  lastName,
  description,
  url,
  isMyPage,
  isSubs,
}) {
  const userText = [
    { key: v4(), count: 4, text: 'Публикаций' },
    { key: v4(), count: subscribers, text: 'Подписчиков' },
    { key: v4(), count: subscribed, text: 'Подписок' },
  ];

  const [btnProps, setBtnProps] = useState({
    onClick: () => false,
    children: 'Подписаться',
  });

  useEffect(() => {
    if (isMyPage) {
      setBtnProps({ onClick: () => false, children: 'Редактировать' });
    } else if (isSubs) {
      setBtnProps({ onClick: () => false, children: 'Отписаться' });
    } else {
      setBtnProps({ onClick: () => false, children: 'Подписаться' });
    }
  }, [isMyPage, isSubs]);

  return (
    <div className='cnUserBioRoot'>
      <div>
        <img
          className='cnUserBioAvatar'
          src={avatarUrl}
          alt='avatar'
        />
      </div>
      <div className='cnUserBioInfo'>
        <div className='cnUserBioRow'>
          <span className='cnUserBioNickname'>{nickname}</span>
          <Button {...btnProps} />
        </div>
        <div className='cnUserBioRow'>
          {userText.map((item) => (
            <UserCounter
              key={item.key}
              count={item.count}
              text={item.text}
            />
          ))}
        </div>
        <div className='cnUserBioRow'>
          <span className='cnUserBioFio'>
            {firstName} {lastName}
          </span>
        </div>
        <div className='cnUserBioRow'>
          <span>{description}</span>
        </div>
        <a href={url}>{url}</a>
      </div>
    </div>
  );
}

export default UserBio;
