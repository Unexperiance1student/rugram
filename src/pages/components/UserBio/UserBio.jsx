import React from 'react';
import { v4 } from 'uuid';
import UserCounter from '../UserCounter/UserCounter';
import './style.scss';

export default function UserBio({
  avatarUrl,
  nickname,
  subscribed,
  subscribers,
  firstName,
  lastName,
  description,
  url,
}) {
  const userText = [
    { key: v4(), count: 4, text: 'Публикаций' },
    { key: v4(), count: subscribers, text: 'Подписчиков' },
    { key: v4(), count: subscribed, text: 'Подписок' },
  ];
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
