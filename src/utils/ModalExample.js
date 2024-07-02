import React, { useState } from 'react';
import Modal from 'react-modal';
import DaumAddress from './daumAddress';

const ModalExample = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <DaumAddress />
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
};

export default ModalExample;