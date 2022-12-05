import React, { useRef } from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal';
import Button from '../../../UI/Button/Button';
import TextArea from '../../../UI/TextArea/TextArea';
import Comment from '../Comment/Comments';
import UserBage from '../UserBage/UserBage';

import './style.scss';

function PhotoModal({
  isOpen,
  onClose,
  imgUrl,
  userName,
  avatarUrl,
  userId,
  comments,
  onCommentSubmit,
}) {
  useEffect(() => {
    const body = document.querySelector('body');
    if (isOpen) {
      body.classList.add('cnBodyOverflow');
    } else {
      body.classList.remove('cnBodyOverflow');
    }
  }, [isOpen]);
  let textRef = useRef('');

  const sendComments = () => {
    onCommentSubmit(textRef);
  };
  return (
    <Modal
      className='cnModal'
      overlayClassName='cnModalOverlay'
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}>
      <div className='cnModalRoot'>
        <div className='cnModalWrapper'>
          <img
            src={imgUrl}
            alt={imgUrl}
            className='cnModalImg'
          />
        </div>
        <div className='cnModalCommentsBlock'>
          <div>
            <div className='cnModalHeader'>
              <UserBage
                nickName={userName}
                avatarUrl={avatarUrl}
                id={userId}
              />
            </div>
            <div className='cnModalComments'>
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                />
              ))}
            </div>
          </div>
          <div>
            <div className='cnModalIcons'>
              <i className='fa fa-heart' />
              <i />
            </div>
            <div className='cnDetailedCardTextareaWrapper'>
              <TextArea
                textRef={textRef}
                placeholder='Оставьте комментарий'
              />
              <Button
                onClick={sendComments}
                className='cnDetailedCardButton'>
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default React.memo(PhotoModal);
