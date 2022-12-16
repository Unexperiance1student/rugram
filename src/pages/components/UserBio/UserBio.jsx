import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import Button from '../../../UI/Button/Button';
import FormTextArea from '../../../UI/FormTextArea/FormTextArea';
import Input from '../../../UI/Input/Input';
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
  onEdit,
}) {
  const userText = [
    { key: 1, count: 4, text: 'Публикаций' },
    { key: 2, count: subscribers, text: 'Подписчиков' },
    { key: 3, count: subscribed, text: 'Подписок' },
  ];

  const [btnProps, setBtnProps] = useState({
    onClick: () => false,
    children: 'Подписаться',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [formUserName, setFormUserName] = useState(nickname);
  const [formFirstName, setFormFirstName] = useState(firstName);
  const [formLastName, setFormLastName] = useState(lastName);
  const [formDescription, setFormDescription] = useState(description);
  const [formUrl, setFormUrl] = useState(url);
  const [userNameError, setUserNameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [urlError, setUrlError] = useState('');
  const requiredText = 'Поле обязательно';

  const validateText = (text, cb) => {
    if (!text) {
      cb(requiredText);
      return true;
    }

    if (text < 3) {
      cb('Сликом короткий текст');
      return true;
    }

    if (/\s/g.test(text)) {
      cb('Не должно быть пробелов');
      return true;
    }

    return false;
  };

  const validateUrl = (text, cb) => {
    if (
      !/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim.test(
        text
      )
    ) {
      cb('Не валидная ссылка');
      return true;
    }

    if (!text) {
      cb(requiredText);
      return true;
    }
    return false;
  };

  const onSaveEditForm = useCallback(() => {
    const isUserNameError = validateText(formUserName, setUserNameError);
    const isFirsNameError = validateText(formFirstName, setFirstNameError);
    const isLastNameError = validateText(formLastName, setLastNameError);
    const isUrlError = validateUrl(formUrl, setUrlError);

    let isErrors =
      isUserNameError || isFirsNameError || isLastNameError || isUrlError;

    if (!formDescription) {
      isErrors = true;
      setDescriptionError(requiredText);
    }

    if (isErrors) {
      return;
    }

    onEdit({
      firstName: formFirstName,
      lastName: formLastName,
      nickname: formUserName,
      description: formDescription,
      url: formUrl,
    });

    // alert('succes');
    setIsEditMode(false);
    setUserNameError('');
    setFirstNameError('');
    setLastNameError('');
    setDescriptionError('');
    setUrlError('');
  }, [formUserName, formFirstName, formLastName, formDescription, formUrl]);

  useEffect(() => {
    if (isMyPage) {
      if (isEditMode) {
        setBtnProps({
          onClick: onSaveEditForm,
          children: 'Сохранить',
          className: 'cnUserEditButton',
        });
      } else {
        setBtnProps({
          onClick: () => setIsEditMode(true),
          children: 'Редактировать',
        });
      }
    } else if (isSubs) {
      setBtnProps({ onClick: () => false, children: 'Отписаться' });
    } else {
      setBtnProps({ onClick: () => false, children: 'Подписаться' });
    }
  }, [isMyPage, isSubs, isEditMode, onSaveEditForm]);

  const fields = useMemo(() => {
    if (isEditMode) {
      return {
        userName: (
          <Input
            value={formUserName}
            onChange={(e) => setFormUserName(e.target.value)}
            className='cnInput'
            errorText={userNameError}
          />
        ),
        name: (
          <>
            <Input
              value={formFirstName}
              onChange={(e) => setFormFirstName(e.target.value)}
              className='cnInput'
              errorText={firstNameError}
            />
            <Input
              value={formLastName}
              onChange={(e) => setFormLastName(e.target.value)}
              className='cnInput'
              errorText={lastNameError}
            />
          </>
        ),
        descr: (
          <FormTextArea
            className='cnInput'
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            errorText={descriptionError}
          />
        ),
        url: (
          <Input
            value={formUrl}
            onChange={(e) => setFormUrl(e.target.value)}
            errorText={urlError}
          />
        ),
        firstButtonClassName: 'cnUserBioButtonRow',
      };
    }
    return {
      userName: <span className='cnUserBioNickname'>{nickname}</span>,
      name: (
        <span className='cnUserBioFio'>
          {firstName} {lastName}
        </span>
      ),
      descr: <span>{description}</span>,
      url: <a href={url}>{url}</a>,
      firstButtonClassName: 'cnUserBioRow',
    };
  }, [
    isEditMode,
    nickname,
    firstName,
    lastName,
    url,
    formDescription,
    formFirstName,
    formLastName,
    formUrl,
    formUserName,
    userNameError,
    firstNameError,
    lastNameError,
    descriptionError,
    urlError,
  ]);

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
        <div className={fields.firstButtonClassName}>
          {fields.userName}
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
        <div className='cnUserBioRow'>{fields.name}</div>
        <div className='cnUserBioRow'>{fields.descr}</div>
        {fields.url}
      </div>
    </div>
  );
}

export default UserBio;
