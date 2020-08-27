import React from 'react';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal,
} from '@chakra-ui/core';
import Button from '@chakra-ui/core/dist/Button';

const CustomModal = ({ isOpen = false, onClose = (f) => f, body, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
